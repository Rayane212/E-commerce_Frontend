import { Customer } from "./Customer";
import { Order } from "./Order";


export interface TableListProps {
    customers : Customer[]; 
    orders : Order[];
  }