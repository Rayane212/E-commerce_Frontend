export interface Customer {
    id: string;
    lastname: string;
    firstname: string; 
    email: string;
    phone_number: string;
    marketing: boolean;
    address: {
      number: string;
      street: string;
      city: string;
      zip_code: string;
      country: string;
    };
    order_before: boolean;
    orders_count: string;
    total_article_count: string;
    total_order_amount: string;
    created_at: string;
    updated_at: string;
}