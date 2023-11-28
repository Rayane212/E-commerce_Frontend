import React from 'react'

export default function OrdersTable_Header() {
  return (
    <thead>
        <tr className='table_header'>
            <td className="tg-ycr8 border-right">Commande</td>
            <td className="tg-ycr8 border-right">Date</td> 
            <td className="tg-ycr8 border-right">Client</td> 
            <td className="tg-ycr8 border-right">Total</td>  
            <td className="tg-ycr8 border-right">Nombre d'articles</td> 
            <td className="tg-ycr8 border-right">Méthode d'expédition</td> 
            <td className="tg-ycr8 border-right">Traitement</td> 
            <td className="tg-ycr8 ">Statut</td> 
        </tr>
    </thead>
  )
}
