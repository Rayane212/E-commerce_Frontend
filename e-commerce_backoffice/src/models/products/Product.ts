export interface Product {
  id?: string;
  name?: string;
  description?: string; 
  on_sale?: boolean;
  stock?: string;
  category?: string;
  supplier?: string;
  sell_price?: number;
  reduced_price?: number;
  buy_price?: number; 
  variants ?: {[key: string]: string[]};
  is_listed?: boolean;
  meta_title_seo?: string; 
  meta_description_seo ?: string; 
  created_at ?: string; 
  updated_at ?: string;
}
