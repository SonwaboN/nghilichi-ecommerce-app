export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'spiritual' | 'herbal' | 'bundle';
  image: string;
  purpose: string[];
  instructions: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ConsultationSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
}
