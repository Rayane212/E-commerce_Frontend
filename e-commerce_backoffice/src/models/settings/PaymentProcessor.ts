export interface PaymentProcessor {
    payment_processor_id: number;
    payment_processor_name: string;
    payment_processor_test_mode: boolean;
    payment_processor_api_key: string;
    payment_processor_api_secret: string;
    payment_processor_api_public: string;
}