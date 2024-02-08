export interface Order {
    id: string;
    track_number: string; 
    total_price: string;
    items: string[];
    client_id: string;
    shipping_method_id: string;
    article_count: string;
    shipping_status: boolean;
    process_status: boolean;
    payments_status : boolean;
    created_at: string;
    updated_at: string;
}




  

