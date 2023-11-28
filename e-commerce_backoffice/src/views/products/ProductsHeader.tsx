import React from 'react'

export default function ProductsHeader() {
  function dontRedirect(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
    e.preventDefault();
  }
  return (
    <div className='pageHeader'>
        <h1>Produits</h1>
        <a href='#' id="create_product_btn" className='button create_button' onClick={dontRedirect}>Créer un produit</a>
    </div>
  )
}
