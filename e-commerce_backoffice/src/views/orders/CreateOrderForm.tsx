import React, {useState, useEffect } from 'react'
import ShippingMethodService from '../../services/shipping_method/ShippingMethodService';
import { ShippingMethod } from '../../models/ShippingMethod';
import CreateOrder from '../../services/orders/CreateOrder';

export default function CreateOrderForm() {
    // State Declarations
    const [shipping_methods, setShippingMethods] = useState<ShippingMethod[]>([]);

    // Récupération des méthodes d'expédition
    async function getData(){
        const request = (await ShippingMethodService.getShippingMethods()) as ShippingMethod[];
        setShippingMethods(request);
    }
    function refreshData(){
        getData();
    }
    useEffect(() => {
        refreshData();
    }, [shipping_methods]);

    

    

  return (
    <div id='create_order_container' className='create_order_container pop_up'>
        <a href='#' className='close_popUp' id='create_order_close'>&times;</a>
        <h2>Créer une commande</h2>
        <form id="create_order_form" action="" method="post">
        <div className="text_input_container">
            <div className="input_container">
            <label htmlFor="client">Client</label>
            <input type="text" name="client" id="client" className="form_field create_order_input" required />
            </div>
            <div className="input_container">
            <label htmlFor="total">Prix Total</label>
            <input type="text" name="total" id="total" className="form_field create_order_input" required />
            </div>
            <div className="input_container">
            <label htmlFor="article_count">Nombre d'articles</label>
            <input type="text" name="article_count" id="article_count" className="form_field create_order_input" required />
            </div>
            <div className="date_input_container input_container">
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" className="form_field create_order_input" required />
            </div>
        </div>
        <div className="shipping_input_container input_container">
            <label htmlFor="shipping_method">Méthode d'expédition</label>
            <select name="shipping_method" id="shipping_method" required>
            {shipping_methods.map((shipping_method, index) => (
                <option key={index} value={shipping_method.title}>
                {shipping_method.title}
                </option>
            ))}
            </select>
        </div>
        <div className="boolean_input_container">
            <div className="input_container">
            <label htmlFor="process">Traité</label>
            <select name="process" id="process">
                <option value="true">Traité</option>
                <option value="false">Non Traité</option>
            </select>
            </div>
            <div className="input_container">
            <label htmlFor="statut">Livré</label>
            <select name="statut" id="statut">
                <option value="true">Livré</option>
                <option value="false">Non Livré</option>
            </select>
            </div>
        </div>
        <div className="btn_submit_container">
            <button type="submit" className="btn" id="create_order_submit_btn">
            Créer
            </button>
        </div>
    </form>
    </div>
  )
}