
export interface FileData {
  mimeType: string;
  data: string; // Base64
  name: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachment?: FileData;
  sources?: GroundingSource[];
}

export interface ProfitStats {
  sellingPrice: number;
  productCost: number;
  adCost: number;
  deliveryCost: number;
}

export interface WinningCriteria {
  label: string;
  score: number;
}
