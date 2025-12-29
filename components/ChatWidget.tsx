
import React, { useState, useRef, useEffect } from 'react';
import { chatWithMentor, speakText, transcribeAudio, decodeBase64Audio, playPCM } from '../services/gemini';
import { Message, FileData } from '../types';
import { AUTHORIZED_EMAILS } from '../constants';

const STORAGE_KEY = 'launchify_chat_history';

interface ChatWidgetProps {
  onVerified: () => void;
  isVerified: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onVerified, isVerified }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState<FileData | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [useDeepThink, setUseDeepThink] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        resetChat(isVerified);
      }
    } else {
      resetChat(isVerified);
    }
  }, [isVerified]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    }
  }, [messages]);

  const resetChat = (verified: boolean) => {
    const initialContent = verified 
      ? "Identity Verified! Welcome Founder. Aapka full access unlock ho gaya hai. Bataiye main aapki kaise help kar sakta hoon? 😊"
      : "Assalam o Alaikum! Launchify Master Portal mein khush-amdeed. Platform access karne ke liye apna Registered Email address likhein.";
    
    setMessages([{
      id: '1',
      role: 'assistant',
      content: initialContent,
      timestamp: new Date()
    }]);
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      localStorage.removeItem(STORAGE_KEY);
      resetChat(isVerified);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setAttachment({
          mimeType: file.type,
          data: base64,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = (reader.result as string).split(',')[1];
          setIsLoading(true);
          const transcription = await transcribeAudio(base64, 'audio/webm');
          if (transcription) setInput(transcription);
          setIsLoading(false);
        };
        reader.readAsDataURL(audioBlob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("Microphone access denied or error occurred.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTTS = async (msgId: string, text: string) => {
    setIsPlayingAudio(msgId);
    const audioData = await speakText(text);
    if (audioData) {
      const bytes = decodeBase64Audio(audioData);
      await playPCM(bytes);
    }
    setIsPlayingAudio(null);
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachment) || isLoading) return;

    const currentInput = input.trim() || (attachment ? "Analyze this image." : "");
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentInput,
      timestamp: new Date(),
      attachment: attachment || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachment(null);
    setIsLoading(true);

    if (!isVerified) {
      setTimeout(() => {
        const emailMatch = AUTHORIZED_EMAILS.find(e => e.toLowerCase() === currentInput.toLowerCase());
        if (emailMatch) {
          onVerified();
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'assistant',
            content: "Identity Verified! Welcome Founder. Aapka full access unlock ho gaya hai. Bataiye main aapki kaise help kar sakta hoon? 😊",
            timestamp: new Date()
          }]);
        } else {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'assistant',
            content: "Maaf kijiyega, ye email authorized nahi hai. Access ke liye Mufeez bhai se rabta karein.",
            timestamp: new Date()
          }]);
        }
        setIsLoading(false);
      }, 600);
      return;
    }

    const history = messages.slice(-8).map(m => ({
      role: m.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: m.content }]
    }));

    const result = await chatWithMentor(currentInput, history, userMsg.attachment, useDeepThink);
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: result.text,
      timestamp: new Date(),
      sources: result.sources
    }]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full p-4 relative overflow-hidden">
      {/* Header Tools */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isVerified ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 animate-pulse'}`}></div>
            <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">
              {isVerified ? 'Verified Founder' : 'Locked Session'}
            </span>
          </div>
          {isVerified && (
            <button 
              onClick={() => setUseDeepThink(!useDeepThink)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${useDeepThink ? 'bg-green-500/20 border-green-500/40 text-green-500' : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-white'}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-[9px] font-black uppercase tracking-widest">Deep Think</span>
            </button>
          )}
        </div>
        {isVerified && (
          <button 
            onClick={handleClearHistory}
            className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
            title="Clear Chat History"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-1 scroll-smooth" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {msg.attachment && (
              <div className="mb-2 max-w-[200px] rounded-2xl overflow-hidden border border-white/10">
                <img src={`data:${msg.attachment.mimeType};base64,${msg.attachment.data}`} alt="Upload" className="w-full h-auto object-cover" />
              </div>
            )}
            <div className={`group relative max-w-[85%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-green-600 text-white font-medium rounded-tr-none' 
                : 'bg-[#1a1a1a] text-zinc-100 border border-white/5 rounded-tl-none shadow-lg'
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              
              {msg.role === 'assistant' && isVerified && (
                <button 
                  onClick={() => handleTTS(msg.id, msg.content)}
                  disabled={isPlayingAudio === msg.id}
                  className={`absolute -right-10 top-0 p-2 rounded-full hover:bg-white/5 transition-all ${isPlayingAudio === msg.id ? 'text-green-500 animate-pulse' : 'text-zinc-600 opacity-0 group-hover:opacity-100'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                </button>
              )}

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                  <p className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">Grounding Sources</p>
                  {msg.sources.map((s, idx) => (
                    <a key={idx} href={s.uri} target="_blank" rel="noopener" className="block text-[10px] text-green-400 hover:underline truncate">
                      • {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[9px] text-zinc-600 mt-1 uppercase tracking-tighter">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3 bg-[#111] px-5 py-3 rounded-2xl border border-white/5 shadow-2xl">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,197,94,0.6)] [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,197,94,0.6)] [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 animate-pulse">
                {useDeepThink ? 'Deep Thinking Mode Active' : 'AI Processing'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Attachment Preview */}
      {attachment && (
        <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-t-2xl flex items-center justify-between mb-0 mx-4">
          <div className="flex items-center gap-2 overflow-hidden">
             <img src={`data:${attachment.mimeType};base64,${attachment.data}`} className="w-8 h-8 rounded object-cover" />
             <span className="text-[10px] text-green-500 font-bold truncate">{attachment.name}</span>
          </div>
          <button onClick={() => setAttachment(null)} className="text-green-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="flex flex-col gap-2 p-1.5 bg-[#111] rounded-2xl border border-white/5 shadow-inner focus-within:border-green-500/30 transition-colors">
        <div className="flex gap-2 w-full">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-zinc-500 hover:text-green-500 hover:bg-green-500/5 rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={!isVerified ? "Registered Email Address..." : "Apna sawal likhein..."}
            className="flex-1 bg-transparent py-3 px-2 focus:outline-none text-white text-sm placeholder:text-zinc-600"
          />

          <div className="flex items-center gap-1">
            <button 
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onMouseLeave={stopRecording}
              className={`p-3 transition-all rounded-xl ${isRecording ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-zinc-500 hover:text-green-500 hover:bg-green-500/5'}`}
              title="Hold to Transcribe Audio"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>

            <button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !attachment)}
              className="bg-green-500 text-black px-6 py-3 rounded-xl disabled:opacity-50 hover:bg-green-400 transition-all font-black text-xs uppercase tracking-widest shadow-lg h-full"
            >
              {isVerified ? 'Send' : 'Verify'}
            </button>
          </div>
        </div>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />
      
      <p className="text-[9px] text-center mt-2 text-zinc-600 uppercase font-black tracking-widest opacity-50">
        Launchify Proprietary Intelligence Hub
      </p>
    </div>
  );
};

export default ChatWidget;
