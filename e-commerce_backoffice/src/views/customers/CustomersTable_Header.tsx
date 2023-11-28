import React from 'react'

export default function CustomersTable_Header() {
  return (
    <thead>
        <tr className='table_header'>
            <td className="tg-ycr8 border-right">ID</td>
            <td className="tg-ycr8 border-right">Nom</td> 
            <td className="tg-ycr8 border-right">Mail</td> 
            <td className="tg-ycr8 border-right">Abonné</td> 
            <td className="tg-ycr8 border-right">Nombre de Commande</td>  
            <td className="tg-ycr8 border-right">Nombre d'articles Commandés</td> 
            <td className="tg-ycr8 border-right">Montant Dépensé</td>
        </tr>
    </thead>
  )
}
