import React from 'react'
import { Customer } from '../../models/customers/Customer'

export default function CustomerSort(list: Customer[], by:string, order:string) {
    const sortedCustomers = list.slice().sort((a: Customer, b: Customer) => {
        if (by === 'id') {
            if (order === 'asc') {
                return parseInt(a.id) - parseInt(b.id)
            } else {
                return parseInt(b.id) - parseInt(a.id)
            }
        }
        else if (by === 'name') {
            if (order === 'asc') {
                return a.name && b.name ? a.name.localeCompare(b.name) : 0
            } else {
                return b.name && a.name ? b.name.localeCompare(a.name) : 0
            }
        }
        else if (by === 'total') {
            if (order === 'asc') {
                return a.total_order_amount && b.total_order_amount ? parseInt(a.total_order_amount) - parseInt(b.total_order_amount) : 0
            } else {
                return a.total_order_amount && b.total_order_amount ? parseInt(b.total_order_amount) - parseInt(a.total_order_amount) : 0
            }
        }
        else if (by === 'articles') {
            if (order === 'asc') {
                return a.total_article_count && b.total_article_count ? parseInt(a.total_article_count) - parseInt(b.total_article_count) : 0
            } else {
                return a.total_article_count && b.total_article_count ? parseInt(b.total_article_count) - parseInt(a.total_article_count) : 0
            }
            
        }
        else if (by === 'orders'){
            if (order === 'asc') {
                return a.orders_count && b.orders_count ? parseInt(a.orders_count) - parseInt(b.orders_count) : 0
            } else {
                return a.orders_count && b.orders_count ? parseInt(b.orders_count) - parseInt(a.orders_count) : 0
            }
        }
        else {
            return 0
        }
      });
      return sortedCustomers;
}
