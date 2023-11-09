import React, { FC, useEffect, useState } from 'react';
import '../css/order.css';
import useOrders from './useOrders';
import getOrders from '../../../services/orderService';


// interface OrderProps {
//   orders: Order[];
// }

// const order_mockup: string[] = ["ID", "date", "client", 'total', "article_count", "shipping_method", "process", "statut"];
// const order_test: Order[] = [
//   { id: "1", date:'12/12/2018', client:'Hamza Sabil', total:"34.98", article_count:"1", shipping_method:"Livraison Express en 3 jours", process:true, statut:true},
//   { id: "2", date:'20/02/2020', client:'Romain Lienhart', total:"89.97", article_count:"3", shipping_method:"Livraison Standard en 7 jours",process:true, statut:true},
//   { id: "3", date:'03/11/2023', client:'Rayan Hadi', total:"59.98", article_count:"2", shipping_method:"Livraison Standard en 7 jours",process:true, statut:false},
//   { id: "4", date:'07/11/2023', client:'Mohamed Lamine', total:"29.99", article_count:"1", shipping_method:"Livraison Standard en 7 jours",process:false, statut:false},
// ];

// const order_processed: Order[] = order_test.filter(order => order.process);
// const order_unprocessed: Order[] = order_test.filter(order => !order.process);
// const order_closed: Order[] = order_test.filter(order => order.statut);

// let view_all = false;
// let view_processed = false;
// let view_unprocessed = true;
// let view_closed = false;


// const OrderTable: FC<OrderProps> = () => {
//   const { orders, getAllOrders} = useOrders();
  

//  return (<>
//     {orders.map((item) => (
//       <tr className='order_row' key={item.id}>
//         <td className="tg-ycr8">{item.id}</td>
//         <td className="tg-ycr8">{item.date}</td> 
//         <td className="tg-ycr8">{item.client}</td> 
//         <td className="tg-ycr8">{item.total}</td>  
//         <td className="tg-ycr8">{item.article_count}</td> 
//         <td className="tg-ycr8">{item.shipping_method}</td> 
//         <td className="tg-ycr8">
//           {item.process ? "Traité" : "Non Traité"}
//         </td> 
//         <td className="tg-ycr8">
//           {item.statut ? "Livré" : "Non Livré"}
//         </td> 
//       </tr>
//     ))}
//   </>)
// };





// const Orders: FC = () => {
  
//   return(
//     <div className='container'>
//       <div className='orders_header'>
//         <h1>Commandes</h1>
//         <a href='/create_order' className='button create_order--button'>Créer une commande</a>
//       </div>
      
//       <div className='orders_container'>
//         <div className='orders_filters'>
//           <table className="tg">
//           <tr>
//   <td className="tg-ycr8">
//     <button className='filter__btn' id="all_order__btn" onClick={() => getAllO}>
//       Toutes les commandes
//     </button>
//   </td>
//   <td className="tg-ycr8">
//     <button className='filter__btn' id="processed_order__btn" onClick={() => changeView("processed")}>
//       Traitées
//     </button>
//   </td>
//   <td className="tg-ycr8">
//     <button className='filter__btn' id="unprocessed_order__btn" onClick={() => changeView("unprocessed")}>
//       Non Traitées
//     </button>
//   </td>
//   <td className="tg-0lax">
//     <button className='filter__btn' id="closed_order__btn" onClick={() => changeView("closed")}>
//       Fermées
//     </button>
//   </td>
// </tr>

//           </table>
//           <table className='tg'>
//             <tr>
//               <td className="tg-ycr8">
//                 <input placeholder='Rechercher...'></input>
//               </td>
//               <td className="tg-ycr8"><button className='filter__btn' id="sort__btn">Trier</button></td>  
//             </tr>
//           </table>
//         </div>
//         <div className='orders_list'>
//           <div className='orders'>
//             <table className='tg'>
//               <thead>
//                 <tr className='table_header_orders'>
//                   <td className="tg-ycr8">Commande</td>
//                   <td className="tg-ycr8">Date</td> 
//                   <td className="tg-ycr8">Client</td> 
//                   <td className="tg-ycr8">Total</td>  
//                   <td className="tg-ycr8">Nombre d'articles</td> 
//                   <td className="tg-ycr8">Méthode d'expédition</td> 
//                   <td className="tg-ycr8">Traitement</td> 
//                   <td className="tg-ycr8">Statut</td> 
//                 </tr>
//               </thead>
              
//               <OrderTable orders={order_test} />;
              
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const Order: FC = () => {
  return(
    <div>
    <p>salut</p>
    </div>
  )
} 
export default Order;