import React from 'react'
import { Product } from '../../models/Product';

export default function CustomerSort(list: Product[], by:string, order:string) {
    const sortedProducts = list.slice().sort((a: Product, b: Product) => {
        if (by === 'id') {
            if (order === 'asc') {
                return parseInt(a.id) - parseInt(b.id)
            } else {
                return parseInt(b.id) - parseInt(a.id)
            }
        }
        else if (by === 'name') {
            if (order === 'asc') {
                return a.title && b.title ? a.title.localeCompare(b.title) : 0
            } else {
                return b.title && a.title ? b.title.localeCompare(a.title) : 0
            }
        }
        else if (by === 'price') {
            if (order === 'asc') {
                return a.price_regular && b.price_regular ? parseInt(a.price_regular) - parseInt(b.price_regular) : 0
            } else {
                return a.price_regular && b.price_regular ? parseInt(b.price_regular) - parseInt(a.price_regular) : 0
            }
        }
        else if (by === 'stock') {
            if (order === 'asc') {
                return a.stock && b.stock ? parseInt(a.stock) - parseInt(b.stock) : 0
            } else {
                return a.stock && b.stock ? parseInt(b.stock) - parseInt(a.stock) : 0
            }
        }
        else {
            return 0
        }
      });
      return sortedProducts;
}
