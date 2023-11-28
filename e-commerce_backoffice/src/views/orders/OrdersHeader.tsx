import React from 'react'

export default function OrdersHeader() {
  function dontRedirect(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
    e.preventDefault();
  }
  return (
    <div className='pageHeader'>
        <h1>Commandes</h1>
        <a href='#' id="create_order_btn" className='button create_button' onClick={dontRedirect}>Créer une commande</a>
    </div>
  )
}
