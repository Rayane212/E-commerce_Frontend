import React from 'react'
import MapOptionsRecord from '../general/MapOptionsRecord'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FilterProps = {
    handleFilter: any;
    handleSort: any;
    handleSearch: any;
    optionsList: Record<string, string>;
}


export default function ProductTableFilter({handleFilter, handleSort, handleSearch, optionsList}: FilterProps) {
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
                                <button className='filter__btn btn' id="all_customers__btn" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleFilter("all_products")}>Tous les produits</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="available_products__btn" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleFilter("available_products")}>Produits Disponibles</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="available_products__btn" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleFilter("unavailable_products")} >Produits Indisponibles</button>
                            </td>
                            <td className="tg-0lax">
                                <button className='filter__btn btn' id="out_of_stock_products__btn" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleFilter("out_of_stock_products")} >Produits Épuisés</button>
                            </td>
                        </tr>
                    </thead>
                </table>
                <table className='tg'>
                    <thead>
                        <tr>
                            <td className="tg-ycr8 research_container">
                                <input type="text" id="products_research" placeholder="Rechercher..." onChange={(e:React.ChangeEvent<HTMLInputElement>)=> handleInputChange(e)}/>
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
