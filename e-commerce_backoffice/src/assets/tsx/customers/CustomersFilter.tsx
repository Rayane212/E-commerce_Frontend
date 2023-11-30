import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PopUpSortCustomers from '../../../views/customers/PopUpSortCustomers';
import useCustomersTable from './useCustomersTable';

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
                        <button className='filter__btn btn' id="all_customers__btn">
                            Tous les clients
                        </button>
                    </td>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="buy_customers__btn" >
                            Clients qui ont commandé
                        </button>
                    </td>
                    <td className="tg-ycr8">
                        <button className='filter__btn btn' id="suscribers_customers__btn">
                            Clients Abonnés
                        </button>
                    </td>
                    <td className="tg-0lax">
                        <button className='filter__btn btn' id="unsuscribers_customers__btn">
                            Clients Non-Abonnés
                        </button>
                    </td>
                </tr>
            </thead>
          </table>
          <table className='tg'>
            <thead>
                <tr>
                    <td className="tg-ycr8 research_container">
                        <input type="text" id="customer_research" placeholder="Rechercher..." onChange={(e:React.ChangeEvent<HTMLInputElement>)=> useCustomersTable.customerSearch(e)}/>
                    </td>
                    <td className="tg-ycr8 sort_main_container">
                        <a href='#' onClick={dontRedirect} className='btn'>
                            <button className='filter__btn no_background' id="sort__btn" >
                                <FontAwesomeIcon className="i icon" icon={["fas", "sort"]} />
                                <PopUpSortCustomers/>
                            </button>
                        </a>
                    </td>  
                </tr>
                
            </thead>
          </table>
        </div>
  )
}
