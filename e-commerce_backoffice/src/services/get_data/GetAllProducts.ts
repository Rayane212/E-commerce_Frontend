import React from 'react'
import products from '../../data/json/products.json'
import { Product } from '../../models/products/Product';

export default function GetAllProducts() {
    const data : Product [] = products; 
    return data
  
}
