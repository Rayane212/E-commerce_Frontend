import React from 'react'

export default function SettingsHeader() {
  function dontRedirect(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
    e.preventDefault();
  }
  return (
    <div className='pageHeader'>
        <h1>Paramètres</h1>
        <select className='chooseView'>
            <option value='general'>Général</option>
            <option value='users'>Utilisateurs et Autorisations</option>
            <option value='payments'>Paiements</option>
            <option value='shipping_method'>Méthodes de Livraison</option>
            <option value='politics'>Politiques</option>
        </select>
    </div>
  )
}
