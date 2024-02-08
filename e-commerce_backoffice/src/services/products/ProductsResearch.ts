import { Product } from '../../models/products/Product';

function ProductsResearch(list: Product[], search: string) {
  let productSearch: Product[] = [];
  let isResult: boolean = false;
  try {
      const value = parseInt(search);
      if (isNaN(value)){ // Produit ou Marque/Fournisseur
        const result_name = productNameSearch(search);
        const result_brand = productBrandSearch(search);
        if (!result_name && !result_brand) {
          setIsResult(false);
        }
        else{
          setIsResult(true);
        }
      }
      else{ // Id
          const result = productIDSearch(search);
          !result ? setIsResult(false): setIsResult(true);
      }
  } 
  catch (error) {
    console.error(error);
  }
    
    function setIsResult(value: boolean) {
      isResult = value;
    }
    function setProductSearch(value: Product[]) {
      productSearch = value;
    }

    function productNameSearch(value: string) {
      const productsResearch: Product[] = list.filter(product =>
        (product.name as string).toLowerCase().includes(value.toLowerCase())
      );
      if (productsResearch.length === 0) {
        setIsResult(false);
      }
      else{
        setProductSearch(productsResearch);
        return productsResearch;
      }
    }
    function productBrandSearch(value: string) {
      const productsResearch: Product[] = list.filter(product =>
        (product.supplier as string).toLowerCase().includes(value.toLowerCase())
      );
      if (productsResearch.length === 0) {
        setIsResult(false);
      }
      else{
        setProductSearch(productsResearch);
        return productsResearch;
      }
    }
    function productIDSearch(value: string) {
      const productsResearch: Product[] = list.filter(product =>
        (product.id as string).toString().includes(value)
      );
      if (productsResearch.length === 0) {
        return false;
      }
      else{
        setProductSearch(productsResearch);
        return productsResearch;
      }
    }
    
    if (isResult) {
      return productSearch;
    }
    else{
      return false;
    }
}


export default ProductsResearch;