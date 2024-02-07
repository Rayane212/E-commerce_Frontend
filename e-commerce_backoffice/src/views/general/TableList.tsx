import React from 'react';
import { Customer } from '../../models/customers/Customer';
import { Order } from '../../models/orders/Order';
import { Product } from '../../models/products/Product';
import { NavLink, useNavigate } from 'react-router-dom';
import useShippingMethods from '../../hooks/useShippingMethods';
import useCustomers from '../../hooks/useCustomers';


interface TableListProps {
  list: any;
  columnsKeys?: string[];
}


export default function TableList({ list, columnsKeys } : TableListProps){
  const {getShippingMethodsById} = useShippingMethods()
  const {getCustomerById} = useCustomers()
  const currency: string[] = ["euro", "EUR", "€"];

  const getShippingMethodTitle = (id: string) => {
    const shippingMethod =  getShippingMethodsById(id)
    if (shippingMethod !== undefined){
      return shippingMethod.title
    }
  }

  const getCustomerFullName = (id?: string, data?:Customer) => {
    if (!data && !id) return 
    if (data){
      return data.firstname + " " + data.lastname
    }
    if (id){
      const customer =  getCustomerById(id)
      if (customer !== undefined){
        return customer.firstname + " " + customer.lastname
      }
    }
  }

  // if (customers){
  //   return (
  //     <tbody>
  //       <>
  //         {customers.map((item: Customer) => (
  //           <tr className='result_row' key={item.id}>
  //             <td className="tg-ycr8">{item.id}</td>
  //             <td className="tg-ycr8">{item?.lastname} {item?.firstname}</td> 
  //             <td className="tg-ycr8">{item.email}</td> 
  //             <td className="tg-ycr8">{item.marketing ? "Abonné" : "Pas Abonné"}</td>  
  //             <td className="tg-ycr8">{item.orders_count}</td> 
  //             <td className="tg-ycr8">{item.total_article_count}</td> 
  //             <td className="tg-ycr8">{item.total_order_amount}{currency[2]}</td> 
  //           </tr>
  //         ))}
  //       </>
  //     </tbody>
  //   )
  // }
  // else if (orders){

    

    
  //   return (
  //     <tbody>
  //     <>
  //       {orders.map((item: Order) => (
  //         <tr className='result_row' key={item.id} onClick={()=>{navigate('/orders/' + item.id)}}>
  //           <td className="tg-ycr8">{item.id}</td>
  //           <td className="tg-ycr8">{getCustomerFullName(item?.client_id as string)}</td> 
  //           <td className="tg-ycr8">{item?.total_price}{currency[2]}</td>  
  //           <td className="tg-ycr8">{item.article_count}</td> 
  //           <td className="tg-ycr8">{getShippingMethodTitle(item?.shipping_method_id)}</td> 
  //           <td className="tg-ycr8">
  //             {item?.process_status ? "Traité" : "Non Traité"}
  //           </td> 
  //           <td className="tg-ycr8">
  //             {item?.shipping_status ? "Livré" : "Non Livré"}
  //           </td> 
  //           <td className="tg-ycr8">{item?.created_at}</td> 
  //       </tr>
  //       ))}
  //     </>
  //   </tbody>
  //   )
  // }
    return (
      <tbody>
        <>
          {list.map((item: any) => (
            <tr className='result_row' key={item.id}>
              {columnsKeys?.map((colKey: string) => {
                const keyContent = item[colKey as keyof typeof item]
                const booleanVerif = keyContent === true || keyContent === false ? true : false
                const content = booleanVerif ? (keyContent ? "Oui" : "Non") : keyContent
                const needFullName = colKey.includes('lastname') || colKey.includes('firstname') || colKey.includes('client_id') 
                const needShippingMethodTitle = colKey.includes('shipping_method_id')
                if (needFullName){
                  return (
                    <td key={item?.id + '_' + colKey} className="tg-ycr8">{getCustomerFullName(colKey === "client_id" ? content : item)}</td>
                  )
                }
                else if (needShippingMethodTitle){
                  return (
                    <td key={item?.id + '_' + colKey} className="tg-ycr8">{getShippingMethodTitle(content)}</td>
                  )
                }
                else{
                  return (
                    <td key={item?.id + '_' + colKey} className="tg-ycr8">{content}{colKey.includes('price') === true && currency[2]}</td>
                  )
                }
              })}
            </tr>
          ))}
        </>
      </tbody>
    )
};
