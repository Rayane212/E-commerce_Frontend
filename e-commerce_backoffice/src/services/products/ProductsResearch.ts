import { Product } from '../../models/Product';

function ProductsResearch(list: Product[], search: string) {
  let customerSearch: Product[] = [];
  let isResult: boolean = false;
  try {
    if (search === '') {
      setOrderSearch(list);
    } 
    else {
        const value = parseInt(search);
        if (isNaN(value)){ // Client
            const result = clientResearch(search);
            !result ? setIsResult(false) : setIsResult(true);
        }
        else{ // Id
            const result = customerIdResearch(search);
            !result ? setIsResult(false): setIsResult(true);
        }
    }
  } 
  catch (error) {
    console.log(error);
  }
    
    function setIsResult(value: boolean) {
      isResult = value;
    }
    function setOrderSearch(value: Product[]) {
      customerSearch = value;
    }
    function clientResearch(value: string) {
        const customersResearch: Product[] = list.filter(customer =>
          customer.title.toLowerCase().includes(value.toLowerCase())
        );
        if (customersResearch.length === 0) {
          setIsResult(false);
        }else{
          updateOrderSearch(customersResearch);
          return customersResearch
        }
      }
    function customerIdResearch(value: string) {
      const customersResearch: Product[] = list.filter(customer =>
        customer.id.toString().includes(value)
      );
      if (customersResearch.length === 0) {
        return false;
      }else{
      updateOrderSearch(customersResearch);
      return customersResearch;
      }
    }
    
    function updateOrderSearch(customersResearch: Product[]) {
      if (customersResearch.length === 0) {
        setIsResult(false);
        return customersResearch;
      } else {
        setIsResult(true);
        setOrderSearch(customersResearch);
      }
    }
    
    if (isResult) {
      return customerSearch;
    }
}


export default ProductsResearch;