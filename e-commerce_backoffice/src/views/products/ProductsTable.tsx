import React, {useState, useEffect, useCallback} from 'react'
import { Product } from '../../models/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableTitle from '../general/TableTitle';
import TableList from '../general/TableList';
import NoResult from '../general/NoResult';
import SortOptions from '../general/SortOptions';
import useProductsTable from '../../hooks/useProductsTable';

type ProductState = {
    products: Product[];
    searchValue: string;
    selectedOption: string;
    showList: boolean;
}


export default function CustomersTable() {
    const [state, setState] = useState<ProductState>();
    const filtered_list = useProductsTable.asyncFilterProducts();
    const tableHeaders = ['ID', 'Produit', 'Stock', 'Disponibilité', 'Prix Soldé', 'Prix', 'Marque/Fournisseur']
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
    
    filtered_list.then((result) => {
       if (result !== undefined) {
            filtered_data.all_products = result.data;
            filtered_data.available_products = result.filter_data.available_products;
            filtered_data.unavailable_products = result.filter_data.unavailable_products;
            filtered_data.out_of_stock_products = result.filter_data.out_of_stock_products;
        }
    
    });

    useEffect(() => {
        const allProducts = useProductsTable.GetProducts();
        allProducts.then((result) => {
            if (result !== undefined) {
                setState({
                    products: result,
                    searchValue: '',
                    selectedOption: 'id_asc',
                    showList: true
                })
            }
        })
    }, []);

    
    const dontRedirect = (e: any) => {
        e.preventDefault();
    }

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const result_list = useProductsTable.productSearch(event);
        result_list.then((result) => {
            if (result !== undefined && result !== false) {
                setState({
                    products: result,
                    searchValue: event.target.value,
                    selectedOption: state?.selectedOption as string,
                    showList: true
                })
                reinit_sort()
            }
            if (result === false){
                setState({
                    products: [],
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
                products: data_list as Product[],
                searchValue: state?.searchValue as string,
                selectedOption: state?.selectedOption as string,
                showList: true
            })
            reinit_input()
            reinit_sort()
        }
        else{
            setState({
                products: [],
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
        const sorted_list = useProductsTable.productSort(e, state?.products as Product[]);
        sorted_list.then((result) => {
            if (result !== undefined) {
                setState({
                    products: result,
                    searchValue: state?.searchValue as string,
                    selectedOption: e.target.value,
                    showList: true
                })
                
            }
            else{
                setState({
                    products: [],
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
                                <button className='filter__btn btn' id="all_customers__btn" data-list="all_products" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("all_products")}>Tous les produits</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="available_products__btn" data-list="available_products" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("available_products")}>Produits Disponibles</button>
                            </td>
                            <td className="tg-ycr8">
                                <button className='filter__btn btn' id="available_products__btn" data-list="unavailable_products" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("unavailable_products")} >Produits Indisponibles</button>
                            </td>
                            <td className="tg-0lax">
                                <button className='filter__btn btn' id="out_of_stock_products__btn" data-list="out_of_stock_products" onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => filter__view("out_of_stock_products")} >Produits Épuisés</button>
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
                        {state?.showList ? <TableList customers={[]} orders={[]} products={state?.products}/>: null}
                    </table>
                    {!state?.showList ? <NoResult/> : null}
                </div>
            </div>
        </div>
        
    )
}
