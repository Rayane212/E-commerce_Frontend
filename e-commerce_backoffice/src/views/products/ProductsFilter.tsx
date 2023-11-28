import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopUpSortProducts from './PopUpSortProducts';

export default function ProductsFilter() {
    function dontRedirect(e: any) {
        e.preventDefault();
    }
  return (
    <div className='filters_container'>
        <table className="tg">
            <thead>
                <tr>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="all_products__btn">
                            Tous les produits
                        </button>
                    </td>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="available_products__btn" >
                            Produits Disponibles
                        </button>
                    </td>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="unavailable_products__btn">
                            Produits Indisponibles
                        </button>
                    </td>
                    <td className="tg-0lax">
                        <button className='filter__btn btn' id="out_of_stock_products__btn">
                            Produits Épuisés
                        </button>
                    </td>
                </tr>
            </thead>
          </table>
          <table className='tg'>
            <thead>
                <tr>
                    <td className="tg-ycr8 research_container">
                        <input type="text" id="products_research" placeholder="ID ou Produit..." />
                    </td>
                    <td className="tg-ycr8 sort_main_container">
                        <a href='#' onClick={dontRedirect} className='btn'>
                            <button className='filter__btn no_background' id="sort__btn" >
                                <FontAwesomeIcon className="i icon" icon={["fas", "sort"]} />
                                <PopUpSortProducts/>
                            </button>
                        </a>
                    </td>  
                </tr>
                
            </thead>
          </table>
        </div>
  )
}
