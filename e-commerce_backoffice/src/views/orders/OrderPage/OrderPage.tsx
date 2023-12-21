import PageHeader from '../../general/page_header/PageHeader';
import useOrderPage from '../../../hooks/useOrderPage';


export default function OrderPage() {
  const {state} = useOrderPage() 


  
  if (state?.isDataLoaded) {
    return (
      <div className="main_container">
        <PageHeader
          title={"Commande n°" + state?.order?.id}
          link=''
          buttonTitle='Modifier la commande'
          isButton={true}
          isSelect={false}
          isRecord={false}
          optionsList={{}}
        />
        <div className='order_page'>
          <div className='order_recap'>
            <p className='order_recap_title'>Récapitulatif de la commande</p>
            <table className='table full_width tg'>
              <tr>
                <td>1x Titre du produit</td>
                <td>Prix d'achat</td>
              </tr>
              <tr>
                <td>{state?.shipping_method?.title}</td>
                <td>{state?.shipping_method?.price}€</td>
              </tr>
            </table>
          </div>
          <div className='right_bar order_page_right_bar'>
            <div className='order_page_right_bar_content'>
              <p className='order_page_right_bar_title'>Statut de la commande</p>
              <p className='order_page_right_bar_text'>{}</p>
            </div>
            <div className='order_page_right_bar_content'>
              <p className='order_page_right_bar_title'>Date de la commande</p>
              <p className='order_page_right_bar_text'>{state?.order?.date}</p>
            </div>
            <div className='order_page_right_bar_content'>
              <p className='order_page_right_bar_title'>Total</p>
              <p className='order_page_right_bar_text'>{state?.order?.total}€</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className="main_container">
        Aucun Résultat
      </div>
    )
  }
}
