import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import MapOptionsRecord from '../../general/MapOptionsRecord'
import dico_options from '../../../data/json/dico_option.json';
import useOrders from '../../../hooks/useOrders';

type props = {
    callback_filter?: any;
    callback_search?: any;
    callback_sort?: any;
}


export default function OrdersListFilter({callback_filter, callback_search, callback_sort}: props) {

    const dontRedirect = (e: any) => {
        e.preventDefault();
    }

    const reinit_input = () => {
        const input = document.getElementById('customer_research') as HTMLInputElement;
        input.value = '';
    }

    const reinit_sort = () => {
        const select = document.getElementById('sort_select') as HTMLSelectElement;
        select.value = 'id_asc';
    }  
    const handleBtnClick = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        callback_filter(event);
        reinit_input()
        reinit_sort()
    }
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        callback_search(event);
        // const result_list = useOrdersTable.orderSearch(event);
        // result_list.then((result) => {
        //     if (result !== undefined && result !== false) {
        //         setState({
        //             orders: result,
        //             searchValue: event.target.value,
        //             selectedOption: state?.selectedOption as string,
        //             showList: true
        //         })
        //         reinit_sort()
        //     }
        //     if (result === false){
        //         setState({
        //             orders: [],
        //             searchValue: event.target.value,
        //             selectedOption: state?.selectedOption as string,
        //             showList: false
        //         })
        //         reinit_sort()
        //     }
        // })
        
    }
    
      
    
      
    
      
  return (
    <div className='filters_container'>
        <table className="tg">
            <thead>
                <tr>
                <td className="tg-ycr8">
                    <button className='filter__btn btn' id="all_order__btn" data-list="all_orders" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleBtnClick(e)}>
                    Toutes les commandes
                    </button>
                </td>
                <td className="tg-ycr8">
                    <button className='filter__btn btn' id="processed_order__btn" data-list="processed_orders" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleBtnClick(e)}>
                    Traitées
                    </button>
                </td>
                <td className="tg-ycr8">
                    <button className='filter__btn btn' id="unprocessed_order__btn" data-list="unprocessed_orders" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleBtnClick(e)}>
                    Non Traitées
                    </button>
                </td>
                <td className="tg-0lax">
                    <button className='filter__btn btn' id="closed_order__btn" data-list="closed_orders" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleBtnClick(e)}>
                    Fermées
                    </button>
                </td>
                </tr>
            </thead>
        </table>
        <table className='tg'>
            <thead>
            <tr>
                <td className="tg-ycr8 research_container">
                    <input type="text" id="customer_research" placeholder="Rechercher..." onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleInputChange(e)}/>
                    <div className="date-input-container">
                        <input type="date" id="dateInput" name="dateInput" onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}/>
                        <FontAwesomeIcon className="i icon" icon={["fas", "calendar"]} />
                    </div>
                </td>
                <td className="tg-ycr8 sort_main_container">
                    <a href='#' onClick={dontRedirect} className='btn'>
                        <button className='filter__btn no_background' id="sort__btn" >
                            <FontAwesomeIcon className="i icon" icon={["fas", "sort"]} />
                        </button>
                    </a>
                    <div className='pop_up_sort sort_fields_container'>
                        <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => callback_sort(e)} id='sort_select'>
                            <MapOptionsRecord list={dico_options}/>
                        </select>
                    </div>
                </td>
            </tr>
            </thead>
        </table>
    </div>
  )
}
