export interface CleanResult {
  originalUrl: string;
  cleanedUrl: string;
  removedParams: string[];
  paramCount: number;
  reductionPercentage: number;
}

export interface AiAnalysis {
  riskLevel: 'Low' | 'Medium' | 'High';
  explanation: string;
  dataExposed: string[];
}

export enum ViewState {
  HOME = 'HOME',
  STATS = 'STATS',
  PRO = 'PRO',
}