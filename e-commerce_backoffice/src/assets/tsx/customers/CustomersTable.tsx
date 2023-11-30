import React, {useState, useEffect, useCallback} from 'react'
import { Customer } from '../../../models/Customer';
import CustomersTable_List from '../../../views/customers/CustomersTable_List';
import NoResult from '../../../views/NoResult';
import useCustomersTable from './useCustomersTable';
import PopUpSortCustomers from '../../../views/customers/PopUpSortCustomers';

type CustomerState = {
    customers: Customer[];
    searchValue: string;
    selectedOption: string;
    showList: boolean;
}

export default function CustomersTable() {
    const [state, setState] = useState<CustomerState>();
    
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

    
    return (
        <div className='table_container'>
            <div className='filters_container'>
                <table className="tg">
                    <thead>
                        <tr>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="all_customers__btn">Tous les clients</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="buy_customers__btn" >Clients qui ont commandé</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="suscribers_customers__btn">Clients Abonnés</button>
                            </td>
                            <td className="tg-0lax">
                                <button className='filter__btn btn' id="unsuscribers_customers__btn">Clients Non-Abonnés</button>
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
                                        {/* <FontAwesomeIcon className="i icon" icon={["fas", "sort"]} /> */}
                                        <PopUpSortCustomers/>
                                    </button>
                                </a>
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

