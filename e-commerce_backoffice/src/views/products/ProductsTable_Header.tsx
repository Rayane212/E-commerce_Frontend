import React from 'react'

export default function ProductsTable_Header() {
  return (
    <thead>
        <tr className='table_header'>
            <td className="tg-ycr8 border-right">ID</td>
            <td className="tg-ycr8 border-right">Produit</td> 
            <td className="tg-ycr8 border-right">Stock</td> 
            <td className="tg-ycr8 border-right">Disponibilité</td> 
            <td className="tg-ycr8 border-right">Prix Soldé</td>  
            <td className="tg-ycr8 border-right">Prix</td> 
            <td className="tg-ycr8 border-right">Marque/Fournisseur</td>
        </tr>
    </thead>
  )
}
