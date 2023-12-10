import React, {useState, useEffect, useCallback} from 'react'
import ProductsTable_Header from './ProductsTable_Header';
import ProductsTable_List from './ProductsTable_List';
import Products_NoResult from './Products_NoResult';
import GetAllProducts from '../../services/products/GetAllProducts';
import FilterProducts from '../../services/products/FilterProducts';
import { Product } from '../../models/Product';
import ProductsResearch from '../../services/products/ProductsResearch';
import ProductSort from '../../services/products/ProductSort';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableTitle from '../general/TableTitle';
import TableList from '../general/TableList';
import NoResult from '../general/NoResult';
import SortOptions from '../general/SortOptions';

type ProductState = {
    products: Product[];
    searchValue: string;
    selectedOption: string;
    showList: boolean;
}


export default function CustomersTable() {
    const [state, setState] = useState<ProductState>();
    // const filtered_list = useCustomersTable.asyncFilterCustomers();
    const tableHeaders = ['ID', 'Nom', 'Mail', 'Abonné', 'Nombre de Commande', 'Nombre d\'articles Commandés', 'Montant Dépensé']
    const optionList = {
        'id_asc': 'Par ID Croissant',
        'id_desc': 'Par ID Décroissant',
        'name_asc': 'Par Produit (A-Z)',
        'name_desc': 'Par Produit (Z-A)',
        'price_asc': 'Par Prix Croissant',
        'price_desc': 'Par Prix Décroissant',
        'stock_asc': 'Par Stock Croissant',
        'stock_desc': 'Par Stock Décroissant',
      };
      
    
    let filtered_data: {
        all_products: Product[];
        available_products: Product[];
        unavailable_products: Product[];
        out_of_stock_products: Product[];
    } = {
        all_products: [],
        available_products: [],
        unavailable_products: [],
        out_of_stock_products: []
    };
    
    // filtered_list.then((result) => {
    //    if (result !== undefined) {
    //         filtered_data.all_products = result.data;
    //         filtered_data.available_products = result.filter_data.buyCustomers;
    //         filtered_data.unavailable_products = result.filter_data.suscribedCustomers;
    //         filtered_data.out_of_stock_products = result.filter_data.unsuscribedCustomers;
    //     }
    
    // });

    
    const dontRedirect = (e: any) => {
        e.preventDefault();
    }

    const filter__view = (list:string) => {

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const sort_view = (e: React.ChangeEvent<HTMLSelectElement>) => {

    }

    
    return (
        <div className='table_container'>
            <div className='filters_container'>
                <table className="tg">
                    <thead>
                    <tr>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="all_customers__btn" data-list="all_products" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("all_products")}>Tous les clients</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="available_products__btn" data-list="available_products" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("available_products")}>Clients qui ont commandé</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="available_products__btn" data-list="available_products" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("available_products")} >Clients Abonnés</button>
                            </td>
                            <td className="tg-0lax">
                                <button className='filter__btn btn' id="out_of_stock_products__btn" data-list="out_of_stock_products" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("out_of_stock_products")} >Clients Non-Abonnés</button>
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
                                        <SortOptions list={optionList}/>
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
                        {state?.showList ? <TableList customers={[]} orders={[]}/>: null}
                    </table>
                    {!state?.showList ? <NoResult/> : null}
                </div>
            </div>
        </div>
        
    )
}
