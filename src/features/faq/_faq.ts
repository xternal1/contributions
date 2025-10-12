// src/features/faq/_faq.ts

export interface Faq {
  id: number;
  question: string;
  answer: string;
  faq_category?: FaqCategory | null;
}

export interface FaqCategory {
  id: number;
  name: string;
  faqs: Faq[];
}
