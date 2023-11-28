import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopUpSort from './PopUpSortOrders';

export default function OrdersFilter() {
    function dontRedirect(e: any) {
        e.preventDefault();
    }
  return (
    <div className='filters_container'>
        <table className="tg">
            <thead>
                <tr>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="all_order__btn">
                        Toutes les commandes
                        </button>
                    </td>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="processed_order__btn" >
                        Traitées
                        </button>
                    </td>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="unprocessed_order__btn">
                        Non Traitées
                        </button>
                    </td>
                    <td className="tg-0lax">
                        <button className='filter__btn btn' id="closed_order__btn">
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
                    <input type="text" id="order_research" placeholder="Rechercher..." />
                        <div className="date-input-container">
                            <input type="date" id="dateInput" name="dateInput" />
                            <FontAwesomeIcon className="i icon" icon={["fas", "calendar"]} />
                        </div>
                    </td>
                    <td className="tg-ycr8 sort_main_container">
                        <a href='#' onClick={dontRedirect} className='btn'>
                            <button className='filter__btn no_background' id="sort__btn" >
                                <FontAwesomeIcon className="i icon" icon={["fas", "sort"]} />
                                <PopUpSort />
                            </button>
                        </a>
                    </td>  
                </tr>
                
            </thead>
          </table>
        </div>
  )
}
