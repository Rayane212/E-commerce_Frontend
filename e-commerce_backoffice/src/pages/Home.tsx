import React from 'react';
import PageHeader from '../views/general/page_header/PageHeader';
import ProductsRecap from '../views/products/ProductsRecap';
import Customers_Recap from '../views/customers/recap/Customers_Recap';
import OrdersRecap from '../views/orders/OrdersRecap/OrdersRecap';

function Home() {
    return(
        <div className="main_container">
            <PageHeader 
                title="Accueil" 
                link=''
                buttonTitle=''
                isButton={false}
                isSelect={false}
                isRecord={false}
                optionsList={{}}
            />
        </div>
    )
}


export default Home;
