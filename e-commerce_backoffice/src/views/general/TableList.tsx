import { Customer } from '../../models/customers/Customer';
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

  const getCustomerFullName = (id?: string) => {
    if (!id) return 
    if (id){
      const customer =  getCustomerById(id)
      if (customer !== undefined){
        return customer.firstname + " " + customer.lastname
      }
    }
  }
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
                  const fullName = getCustomerFullName(colKey === "client_id" ? content : item?.id)
                  return (
                    <td key={item?.id + '_' + colKey} className="tg-ycr8">{fullName}</td>
                  )
                }
                else if (needShippingMethodTitle){
                  return (
                    <td key={item?.id + '_' + colKey} className="tg-ycr8">{getShippingMethodTitle(content)}</td>
                  )
                }
                else{
                  return (
                    <td key={item?.id + '_' + colKey} className="tg-ycr8">{content}{colKey.includes('price') || colKey.includes('total') === true && currency[2]}</td>
                  )
                }
              })}
            </tr>
          ))}
        </>
      </tbody>
    )
};
