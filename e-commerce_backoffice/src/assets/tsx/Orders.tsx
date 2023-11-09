import React, { FC } from 'react';
import '../css/order.css';

interface Order {
  id: string;
  date: string;
  client: string;
  total: string;
  article_count: string;
  shipping_method: string;
  process: boolean;
  statut: boolean;
}

const viewSize__witdh: string = '75vh';
const viewSize__height: string = '100vh';

const order_mockup: string[] = ["ID", "date", "client", 'total', "article_count", "shipping_method", "process", "statut"];
const order_test: Order[] = [
  { id: "1", date:'12/12/2018', client:'Hamza Sabil', total:"34.98", article_count:"1", shipping_method:"Livraison Express en 3 jours", process:true, statut:true},
  { id: "2", date:'20/02/2020', client:'Romain Lienhart', total:"89.97", article_count:"3", shipping_method:"Livraison Standard en 7 jours",process:true, statut:true},
  { id: "3", date:'06/04/2023', client:'Rayan Hadi', total:"59.98", article_count:"2", shipping_method:"Livraison Standard en 7 jours",process:true, statut:true},
  { id: "4", date:'07/11/2023', client:'Mohamed Lamine', total:"29.99", article_count:"1", shipping_method:"Livraison Standard en 7 jours",process:false, statut:false},
];

const order_processed: Order[] = [];
const order_unprocessed: Order[] = [];
const order_closed: Order[] = [];

const Orders: FC = () => {
  const currency: string[] = ["euro", "EUR", "€"];
  const order_count: number = order_test.length;
  const total_article_count: number = order_test.reduce((total, item) => total + parseInt(item.article_count), 0);
  const total_order_count: number = order_test.reduce((total, item) => total + parseFloat(item.total), 0);
  const order_process_count: number = order_test.reduce((total, item) => total + (item.process ? 1 : 0), 0);
  const order_delivered_count: number = order_test.reduce((total, item) => total + (item.statut ? 1 : 0), 0);
  
  return(
    <div className='container'>
      <div className='orders_header'>
        <h1>Commandes</h1>
        <a href='/create_order' className='button create_order--button'>Créer une commande</a>
      </div>
      <div className='orders_recap'>
        <table className="tg">
          <thead>
            <tr>
              <td className="tg-ycr8"><span className='text_count'>{order_count}</span> <br></br>Commandes</td>
              <td className="tg-ycr8"><span className='text_count'>{total_order_count} {currency[2]}</span> <br></br>Ventes Totales</td>
              <td className="tg-ycr8"><span className='text_count'>{total_article_count}</span> <br></br>Articles Commandés</td>
              <td className="tg-ycr8"><span className='text_count'>{order_process_count}</span> <br></br>Commandes Traités</td>
              <td className="tg-ycr8"><span className='text_count'>{order_delivered_count}</span> <br></br>Commandes Livrés</td>
            </tr>
          </thead>
        </table>
      </div>
      <div className='orders_container'>
        <div className='orders_filters'>
          <table className="tg">
            <tr>
              <td className="tg-ycr8"><button className='filter__btn' id="all_order__btn">Toutes les commandes</button></td>
              <td className="tg-ycr8"><button className='filter__btn' id="processed_order__btn">Traitées</button></td>
              <td className="tg-ycr8"><button className='filter__btn' id="unprocessed_order__btn">Non Traitées</button></td>
              <td className="tg-0lax"><button className='filter__btn' id="closed_order__btn">Fermées</button></td>
            </tr>
          </table>
          <table className='tg'>
            <tr>
              <td className="tg-ycr8">
                <input placeholder='Rechercher...'></input>
              </td>
              <td className="tg-ycr8"><button className='filter__btn' id="sort__btn">Trier</button></td>  
            </tr>
          </table>
        </div>
        <div className='orders_list'>
          <div className='orders'>
            <table className='tg'>
              <thead>
                <tr className='table_header_orders'>
                  <td className="tg-ycr8">Commande</td>
                  <td className="tg-ycr8">Date</td> 
                  <td className="tg-ycr8">Client</td> 
                  <td className="tg-ycr8">Total</td>  
                  <td className="tg-ycr8">Nombre d'articles</td> 
                  <td className="tg-ycr8">Méthode d'expédition</td> 
                  <td className="tg-ycr8">Traitement</td> 
                  <td className="tg-ycr8">Statut</td> 
                </tr>
              </thead>
              {order_test.map((item) => (
                <tr className='order_row'>
                  <td className="tg-ycr8">{item.id}</td>
                  <td className="tg-ycr8">{item.date}</td> 
                  <td className="tg-ycr8">{item.client}</td> 
                  <td className="tg-ycr8">{item.total}</td>  
                  <td className="tg-ycr8">{item.article_count}</td> 
                  <td className="tg-ycr8">{item.shipping_method}</td> 
                  <td className="tg-ycr8">
                    {item.process ? "Traité" : "Non Traité"}
                  </td> 
                  <td className="tg-ycr8">
                    {item.statut ? "Livré" : "Non Livré"}
                  </td> 
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;