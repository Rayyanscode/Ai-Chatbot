export type Business = {
  id: string;
  name: string;
  category: string;
  description: string;
  avatar: string;
  location: string;
  fullDescription?: string;
  email?: string;
  phone?: string;
  website?: string;
  tags?: string[];
  contactInfo?: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};
