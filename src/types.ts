export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  image: string;
  isPopular?: boolean;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  details: string;
  benefits: string[];
  processSteps: string[];
  icon: string; // Name of Lucide icon
}

export interface Testimonial {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  text: string;
  rating: number;
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  productCategory: string;
  message: string;
  date: string;
  status: 'Received' | 'In Progress' | 'Replied';
}
