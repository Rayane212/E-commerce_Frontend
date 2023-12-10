import { Customer } from "./customers/Customer";
import { Order } from "./orders/Order";
import { Product } from "./Product";


export interface TableListProps {
    customers : Customer[]; 
    orders : Order[];
    products: Product[];
  }