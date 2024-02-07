import PageHeader from '../../general/page_header/PageHeader';
import useOrderPage from '../../../hooks/useOrderPage';
import useOrders from '../../../hooks/useOrders';
import useShippingMethods from '../../../hooks/useShippingMethods';
import useCustomers from '../../../hooks/useCustomers';
import { Order } from '../../../models/orders/Order';
import { ShippingMethod } from '../../../models/ShippingMethod';
import { Customer } from '../../../models/customers/Customer';
import Loader from '../../general/Loader';
import { useEffect } from 'react';


export default function OrderPage() {
  const {orderState} = useOrderPage() 


  
  if (orderState?.isLoading === false)  {
    if (orderState?.isDataLoaded === false) return (<></>)
    else{
      return (
        <div className="main_container">
          <PageHeader
            title={"Commande n°" + orderState?.order?.id}
            link=''
            buttonTitle='Modifier la commande'
            isButton={true}
            isSelect={false}
            isRecord={false}
            optionsList={{}}
          />
          <div className='order_page'>
            <button className='order_page_button' onClick={() => {console.log(orderState)}}>Test</button>
          </div>
        </div>
      )
    }
  }
  else{
    return (
      <Loader/>     
    )
  }
}
