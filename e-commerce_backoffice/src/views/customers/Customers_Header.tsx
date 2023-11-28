import React from 'react'

export default function Customer_Header() {
  return (
    <div className='pageHeader'>
        <h1>Clients</h1>
        <a href='/create_customer' className='button create_button'>Créer un client</a>
    </div>
  )
}
