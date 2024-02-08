export interface Employe{
    id:string; 
    name:string;
    mail:string;
    phone:string;
    username:string;
    last_connexion:string;
    access: {
        general: boolean;
        finance: boolean;
        marketing: boolean;
        website_front: boolean;
        website_back: boolean;
        orders: boolean;
        products: boolean;
        customers: boolean;
        statistique: boolean;
        settings: boolean;
      };
}