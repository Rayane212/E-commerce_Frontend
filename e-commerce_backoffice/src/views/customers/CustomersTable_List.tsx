import React, { FC, useEffect, useState } from 'react';
import { CustomersTableProps } from '../../models/CustomersTableProps'
import { Customer } from '../../models/Customer';

const CustomersTable_List: FC<CustomersTableProps> = ({ list }) => {
  const currency: string[] = ["euro", "EUR", "€"];
  const [data, setData] = useState<Customer[]>([]);
  useEffect(() => {
    setData(list);
  }, [data]);
  return (
    <tbody>
      <>
        {data.map((item: Customer) => (
          <tr className='result_row' key={item.id}>
            <td className="tg-ycr8">{item.id}</td>
            <td className="tg-ycr8">{item.name}</td> 
            <td className="tg-ycr8">{item.email}</td> 
            <td className="tg-ycr8">{item.marketing ? "Abonné" : "Pas Abonné"}</td>  
            <td className="tg-ycr8">{item.orders_count}</td> 
            <td className="tg-ycr8">{item.total_article_count}</td> 
            <td className="tg-ycr8">{item.total_order_amount}{currency[2]}</td> 
          </tr>
        ))}
      </>
    </tbody>
  );
};

export default CustomersTable_List;
