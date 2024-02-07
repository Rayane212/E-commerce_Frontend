import { Order } from '../../models/orders/Order';
import NoResult from '../general/NoResult';
import TableTitle from '../general/TableTitle';
import TableList from '../general/TableList';
import OrdersListFilter from './OrdersList/OrdersListFilter';
import { OrderState } from '../../hooks/useOrders';
import Loader from '../general/Loader';
import Pagination from '../general/pagination/Pagination';


interface OrdersTableProps {
    orders: OrderState,
    filter_view: any,
    sort_view: any,
    search_view: any,
    tableLoading: any;
    handlePagination: any;
    tableHeaders: string[]
}


function OrdersTable({orders, filter_view, sort_view, search_view, tableLoading, tableHeaders, handlePagination}: OrdersTableProps) {
    const columnsKeys = ['id', 'client_id', 'total_price', 'shipping_method_id', 'process_status', 'created_at'];

    const handleFilter = (filterValue : string) => {
        tableLoading(true);
        setTimeout(() => {
            filter_view(filterValue);
            tableLoading(false);
        }, 100);
        reinitInputs();
    }

    const reinitInputs = () => {
        const searchInput = document.getElementById('orders_research') as HTMLInputElement;
        const sortSelect = document.getElementById('sort_select') as HTMLSelectElement;
        searchInput.value = '';
        sortSelect.value = 'id_asc';
    }

    const handleSort = (sortValue : string) => {
        tableLoading(true);
        setTimeout(() => {
            sort_view(sortValue);
            tableLoading(false);
        }, 100);
    }

    const handleSearch = (searchValue : string) => {
        tableLoading(true);
        setTimeout(() => {
            search_view(searchValue);
            tableLoading(false);
        }, 100);
    }



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
        <OrdersListFilter callback_filter={handleFilter} callback_sort={handleSort} callback_search={handleSearch}/>
        <div className='table_list'>
            {!orders?.isTableLoading && orders.tableLoaded ? resultComponent() : <Loader/>}
        </div>
        <Pagination listLength={parseInt((orders?.orders?.activeList?.allList.length).toString())} tableLoading={tableLoading} callback_pagination={handlePagination} options={orders?.pagination}/>
    </div>
)

}

export default OrdersTable;