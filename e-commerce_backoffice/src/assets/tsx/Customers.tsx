import React, { FC } from 'react';
import '../css/customers.css';

interface Customer {
  id: string;
  name: string;
  order_before: boolean;
  orders_count: string;
  total_count: string;
  email: string;
  marketing: boolean;
}

const customer_test: Customer[] = [
  { id: "1", name:"Hamza Sabil", order_before:true, orders_count:"1", total_count:"34.98", email:"hamzasabil@gmail.com", marketing:true},
  { id: "2", name:"Romain Lienhart", order_before:true, orders_count:"1", total_count:"89.97", email:"romainlienhart@gmail.com", marketing:true},
  { id: "3", name:"Rayan Hadi", order_before:true, orders_count:"1", total_count:"59.98", email:"rayanhadi@gmail.com", marketing:false},
  { id: "4", name:"Mohamed Lamine", order_before:true, orders_count:"1", total_count:"29.99", email:"mohamedlamine@gmail.com", marketing:false},
]

const Customers: FC = () => {
  const customers_count: number = customer_test.length;
  const customers_buy_count: number = customer_test.filter(item => item.order_before).length;
  return (
    <div className="container">
      <div className='customers_header'>
          <h1>Clients</h1>
          <a href='/create_customer' className='button create_customer--button'>Créer un client</a>
      </div>
      <div className='customers_recap'>
          <table className="tg">
              <thead>
              <tr>
                  <td className="tg-ycr8"><span className='text_count'>{customers_count}</span> <br></br>Clients</td>
                  <td className="tg-ycr8"><span className='text_count'>2%</span><br></br>ont déjà commandé</td>
              </tr>
              </thead>
              
          </table>
          </div>
    </div>
  );
}

export default Customers;