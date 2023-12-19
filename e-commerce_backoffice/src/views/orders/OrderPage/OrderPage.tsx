import React, {useState, useEffect} from 'react'
import { Order } from '../../../models/orders/Order'
import useOrders from '../../../hooks/useOrders';
import PageHeader from '../../general/page_header/PageHeader';
import { useNavigate } from 'react-router-dom';



export default function OrderPage() {
  const [order, setOrder] = React.useState<Order>();
  const order_id = window.location.href.split("/")[4]; 
  const order_result = useOrders?.getOrderById(order_id);
  const navigate = useNavigate()

  const sections = {
    "content" : {
      "title": "Contenu de la commande",
      "section_type": "content",
      // "list_1": order?.,
    }, 

  }
  useEffect(() => {
    order_result.then((result) => {
      if (result !== undefined) {
        setOrder(result as Order);
      }
      else{
        navigate('/orders')
      }
    })
    
  }, [])

  if (order !== undefined) {
  return (
    <div className="main_container">
      <PageHeader
        title={"Commande n°" + order?.id}
        link=''
        buttonTitle=''
        isButton={false}
        isSelect={true}
        isRecord={false}
        optionsList={{}}
      />
    </div>
  )
  }
  else{
    return (
      <div className="main_container">
        Aucun Résultat
      </div>
    )
  }
}
