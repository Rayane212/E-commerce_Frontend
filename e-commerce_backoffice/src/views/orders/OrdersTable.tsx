import NoResult from '../general/NoResult';
import TableTitle from '../general/TableTitle';
import TableList from '../general/TableList';
import OrdersListFilter from './OrdersList/OrdersListFilter';
import { OrderState } from '../../hooks/useOrders';
import Loader from '../general/Loader';


interface OrdersTableProps {
    orders: OrderState,
    callback_filter: any,
    callback_sort: any,
    callback_search: any,
    tableHeaders: string[]
}


function OrdersTable({orders, callback_filter, callback_search, callback_sort, tableHeaders}: OrdersTableProps) {
    const columnsKeys = ['id', 'client_id', 'total_price', 'shipping_method_id', 'process_status', 'created_at'];

    



    const resultComponent = () => {
        return (
            <div className='results'>
                {orders?.showList ?
                    <table className='tg'>
                        <TableTitle list={tableHeaders}/>
                        <TableList list={orders?.orders?.activeList?.slicedList} columnsKeys={columnsKeys}/>
                    </table> :
                 <NoResult/>}
            </div>

        )
    }

  return (
    <div className='table_container'>
        <OrdersListFilter callback_filter={callback_filter} callback_sort={callback_sort} callback_search={callback_search}/>
        <div className='table_list'>
            {!orders?.isTableLoading && orders.tableLoaded ? resultComponent() : <Loader/>}
        </div>
        
    </div>
)

}

export default OrdersTable;