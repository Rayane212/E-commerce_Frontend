import React from 'react'
import { Product } from '../../models/products/Product';

export default function ProductSort(list: Product[], by:string, order:string) {
    const sortedProducts = list.slice().sort((a: Product, b: Product) => {
        if (by === 'id') {
            if (order === 'asc') {
                return parseInt(a.id as string) - parseInt(b.id as string)
            } else {
                return parseInt(b.id as string) - parseInt(a.id as string)
            }
        }
        else if (by === 'name') {
            if (order === 'asc') {
                return a.name && b.name ? a.name.localeCompare(b.name) : 0
            } else {
                return b.name && a.name ? b.name.localeCompare(a.name) : 0
            }
        }
        else if (by === 'price') {
            if (order === 'asc') {
                return a.sell_price && b.sell_price ? a.sell_price - b.sell_price  : 0
            } else {
                return a.sell_price && b.sell_price ? b.sell_price - a.sell_price : 0
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
