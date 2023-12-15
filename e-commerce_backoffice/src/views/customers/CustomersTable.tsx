import React, {useState, useEffect} from 'react'
import { Customer } from '../../models/customers/Customer';
import TableList from '../general/TableList';
import NoResult from '../general/NoResult';
import useCustomersTable from '../../hooks/useCustomersTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableTitle from '../general/TableTitle';
import MapOptionsRecord from '../general/MapOptionsRecord';


type CustomerState = {
    customers: Customer[];
    searchValue: string;
    selectedOption: string;
    showList: boolean;
}

export default function CustomersTable() {
    const [state, setState] = useState<CustomerState>();
    const filtered_list = useCustomersTable.asyncFilterCustomers();
    const tableHeaders = ['ID', 'Nom', 'Mail', 'Abonné', 'Nombre de Commande', 'Nombre d\'articles Commandés', 'Montant Dépensé']
    const optionList = {'id_asc': 'Par ID Croissant', 'id_desc': 'Par ID Décroissant', 'name_asc': 'Par Nom (A-Z)', 'name_desc': 'Par Nom (Z-A)', 'total_asc': 'Par Total Croissant', 'total_desc': 'Par Total Décroissant', 'articles_asc': 'Par Nombre d\'articles Croissant', 'articles_desc': 'Par Nombre d\'articles Décroissant', 'orders_asc': 'Par Nombre de Commande Croissant', 'orders_desc': 'Par Nombre de Commande Décroissant'}
    
    let filtered_data: {
        all_customers: Customer[];
        buy_customers: Customer[];
        suscribers_customers: Customer[];
        unsuscribers_customers: Customer[];
    } = {
        all_customers: [],
        buy_customers: [],
        suscribers_customers: [],
        unsuscribers_customers: []
    };
    
    filtered_list.then((result) => {
       if (result !== undefined) {
            filtered_data.all_customers = result.data;
            filtered_data.buy_customers = result.filter_data.buyCustomers;
            filtered_data.suscribers_customers = result.filter_data.suscribedCustomers;
            filtered_data.unsuscribers_customers = result.filter_data.unsuscribedCustomers;
        }
    
    });
    
    const dontRedirect = (e: any) => {
        e.preventDefault();
    }


    useEffect(() => {
        const allCustomers = useCustomersTable.GetCustomers();
        allCustomers.then((result) => {
            if (result !== undefined) {
                setState({
                    customers: result,
                    searchValue: '',
                    selectedOption: 'id_asc',
                    showList: true
                })
            }
        })
    }, []);

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const result_list = useCustomersTable.customerSearch(event);
        result_list.then((result) => {
            if (result !== undefined && result !== false) {
                setState({
                    customers: result,
                    searchValue: event.target.value,
                    selectedOption: state?.selectedOption as string,
                    showList: true
                })
                reinit_sort()
            }
            if (result === false){
                setState({
                    customers: [],
                    searchValue: event.target.value,
                    selectedOption: state?.selectedOption as string,
                    showList: false
                })
                reinit_sort()
            }
        })
        
    }

    const reinit_input = () => {
        const input = document.getElementById('customer_research') as HTMLInputElement;
        input.value = '';
    }

    const reinit_sort = () => {
        const select = document.getElementById('sort_select') as HTMLSelectElement;
        select.value = 'id_asc';
    }

    const filter__view = (list:string) => {
        const data_list = filtered_data[list as keyof typeof filtered_data];
        if (data_list !== undefined) {
            setState({
                customers: data_list as Customer[],
                searchValue: state?.searchValue as string,
                selectedOption: state?.selectedOption as string,
                showList: true
            })
            reinit_input()
            reinit_sort()
        }
        else{
            setState({
                customers: [],
                searchValue: state?.searchValue as string,
                selectedOption: state?.selectedOption as string,
                showList: false
            })
            reinit_input()
            reinit_sort()
        }
        
    }

    const sort_view = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const sorted_list = useCustomersTable.customerSort(e, state?.customers as Customer[]);
        sorted_list.then((result) => {
            if (result !== undefined) {
                setState({
                    customers: result,
                    searchValue: state?.searchValue as string,
                    selectedOption: e.target.value,
                    showList: true
                })
                
            }
            else{
                setState({
                    customers: [],
                    searchValue: state?.searchValue as string,
                    selectedOption: e.target.value,
                    showList: false
                })
            }
        })
        
    }
    
    return (
        <div className='table_container'>
            <div className='filters_container'>
                <table className="tg">
                    <thead>
                        <tr>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="all_customers__btn" data-list="all_customers" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("all_customers")}>Tous les clients</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="buy_customers__btn" data-list="buy_customers" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("buy_customers")}>Clients qui ont commandé</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="suscribers_customers__btn" data-list="suscribers_customers" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("suscribers_customers")} >Clients Abonnés</button>
                            </td>
                            <td className="tg-0lax">
                                <button className='filter__btn btn' id="unsuscribers_customers__btn" data-list="unsuscribers_customers" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("unsuscribers_customers")} >Clients Non-Abonnés</button>
                            </td>
                        </tr>
                    </thead>
                </table>
                <table className='tg'>
                    <thead>
                        <tr>
                            <td className="tg-ycr8 research_container">
                                <input type="text" id="customer_research" placeholder="Rechercher..." onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleInputChange(e)}/>
                            </td>
                            <td className="tg-ycr8 sort_main_container">
                                <a href='#' onClick={dontRedirect} className='btn'>
                                    <button className='filter__btn no_background' id="sort__btn" >
                                        <FontAwesomeIcon className="i icon" icon={["fas", "sort"]} />
                                    </button>
                                </a>
                                <div className='pop_up_sort sort_fields_container'>
                                    <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => sort_view(e)} id='sort_select'>
                                        <MapOptionsRecord list={optionList}/>
                                    </select>
                                </div>
                            </td>  
                        </tr>
                        
                    </thead>
                </table>
            </div>
            <div className='table_list'>
                <div className='results'>
                    <table className='tg'>
                        <TableTitle list={tableHeaders}/>
                        {state?.showList ? <TableList customers={state?.customers} orders={[]} products={[]}/>: null}
                    </table>
                    {!state?.showList ? <NoResult/> : null}
                </div>
            </div>
        </div>
    )
}

