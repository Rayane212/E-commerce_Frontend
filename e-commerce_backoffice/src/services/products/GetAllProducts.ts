import React from 'react'
import products from '../../assets/json/products.json'
import { Product } from '../../models/Product';

export default function GetAllProducts() {
    const data : Product [] = products; 
    return data
  
}
