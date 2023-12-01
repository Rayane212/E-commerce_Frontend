import React, {useState, useEffect} from 'react'
import { Customer } from '../../../models/Customer';
import CustomersTable_List from '../../../views/customers/CustomersTable_List';
import NoResult from '../../../views/NoResult';
import useCustomersTable from './useCustomersTable';
import PopUpSortCustomers from '../../../views/customers/PopUpSortCustomers';
import { CustomersTableProps } from '../../../models/CustomersTableProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CustomerState = {
    customers: Customer[];
    searchValue: string;
    selectedOption: string;
    showList: boolean;
}

export default function CustomersTable() {
    const [state, setState] = useState<CustomerState>();
    const filtered_list = useCustomersTable.asyncFilterCustomers();
    
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
            }
            if (result === false){
                setState({
                    customers: [],
                    searchValue: event.target.value,
                    selectedOption: state?.selectedOption as string,
                    showList: false
                })
            }
        })
        
    }

    const reinit_input = () => {
        const input = document.getElementById('customer_research') as HTMLInputElement;
        input.value = '';
    }

    const filter__view = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const element = e.target as HTMLButtonElement;
        const data_list_element = element.dataset.list;
        const data_list = filtered_data[data_list_element as keyof typeof filtered_data];
        if (data_list !== undefined) {
            setState({
                customers: data_list as Customer[],
                searchValue: state?.searchValue as string,
                selectedOption: state?.selectedOption as string,
                showList: true
            })
            reinit_input()
        }
        else{
            setState({
                customers: [],
                searchValue: state?.searchValue as string,
                selectedOption: state?.selectedOption as string,
                showList: false
            })
            reinit_input()
        }
        
    }
    
    return (
        <div className='table_container'>
            <div className='filters_container'>
                <table className="tg">
                    <thead>
                        <tr>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="all_customers__btn" data-list="all_customers" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view(e)}>Tous les clients</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="buy_customers__btn" data-list="buy_customers" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view(e)}>Clients qui ont commandé</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="suscribers_customers__btn" data-list="suscribers_customers" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view(e)} >Clients Abonnés</button>
                            </td>
                            <td className="tg-0lax">
                                <button className='filter__btn btn' id="unsuscribers_customers__btn" data-list="unsuscribers_customers" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view(e)} >Clients Non-Abonnés</button>
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
                                <fieldset className='pop_up_sort sort_fiels_container'>
                                    <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => useCustomersTable.customerSort(e)} id='sort_select'>
                                        <option value="id_asc"> Par ID Croissant</option>
                                        <option value="id_desc"> Par ID Décroissant</option>
                                        <option value="name_asc"> Par Nom (A-Z)</option>
                                        <option value="name_desc"> Par Nom (Z-A)</option>
                                        <option value="total_asc"> Par Total Croissant</option>
                                        <option value="total_desc"> Par Total Décroissant</option>
                                        <option value="articles_asc"> Par Nombre d'articles Croissant </option>
                                        <option value="articles_desc"> Par Nombre d'articles Décroissant</option>
                                        <option value="orders_asc"> Par Nombre de Commande Croissant </option>
                                        <option value="orders_desc"> Par Nombre d'articles Décroissant</option>
                                    </select>
                                </fieldset>
                            </td>  
                        </tr>
                        
                    </thead>
                </table>
            </div>
            <div className='table_list'>
                <div className='results'>
                <table className='tg'>
                <thead>
                    <tr className='table_header'>
                        <td className="tg-ycr8 border-right">ID</td>
                        <td className="tg-ycr8 border-right">Nom</td> 
                        <td className="tg-ycr8 border-right">Mail</td> 
                        <td className="tg-ycr8 border-right">Abonné</td> 
                        <td className="tg-ycr8 border-right">Nombre de Commande</td>  
                        <td className="tg-ycr8 border-right">Nombre d'articles Commandés</td> 
                        <td className="tg-ycr8 border-right">Montant Dépensé</td>
                    </tr>
                </thead>
                    {state?.showList ? <CustomersTable_List list={state?.customers}/>: ''}
                </table>
                {!state?.showList ? <NoResult/> : ''}
                </div>
            </div>
        </div>
    )
}

