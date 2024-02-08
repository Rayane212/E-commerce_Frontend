import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import MapOptionsRecord from '../general/MapOptionsRecord'

type FilterProps = {
    handleFilter: any;
    handleSort: any;
    handleSearch: any;
    optionsList: Record<string, string>;
}


export default function CustomersTableFilter({handleFilter, handleSort, handleSearch, optionsList}: FilterProps) {

    const dontRedirect = (e: any) => {
        e.preventDefault();
    }

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const searchValue = event.target.value;
        const trimmedValue = searchValue.trim();
        handleSearch(trimmedValue);
    }

  return (
    <div className='filters_container'>
                <table className="tg">
                    <thead>
                        <tr>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="all_customers__btn" data-list="all_customers" onClick={() => handleFilter("all_customers")}>Tous les clients</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="buy_customers__btn" data-list="buy_customers" onClick={() => handleFilter("buy_customers")}>Clients qui ont commandé</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="suscribers_customers__btn" data-list="suscribers_customers" onClick={() => handleFilter("suscribed_customers")} >Clients Abonnés</button>
                            </td>
                            <td className="tg-0lax">
                                <button className='filter__btn btn' id="unsuscribers_customers__btn" data-list="unsuscribers_customers" onClick={() => handleFilter("unsuscribed_customers")} >Clients Non-Abonnés</button>
                            </td>
                        </tr>
                    </thead>
                </table>
                <table className='tg'>
                    <thead>
                        <tr>
                            <td className="tg-ycr8 research_container">
                                <input type="text" id="customers_research" placeholder="Rechercher..." onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleInputChange(e)}/>
                            </td>
                            <td className="tg-ycr8 sort_main_container">
                                <a href='#' onClick={dontRedirect} className='btn'>
                                    <button className='filter__btn no_background' id="sort__btn" >
                                        <FontAwesomeIcon className="i icon" icon={["fas", "sort"]} />
                                    </button>
                                </a>
                                <div className='pop_up_sort sort_fields_container'>
                                    <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSort(e.target.value)} id='sort_select'>
                                        <MapOptionsRecord list={optionsList}/>
                                    </select>
                                </div>
                            </td>  
                        </tr>
                        
                    </thead>
                </table>
            </div>
  )
}
