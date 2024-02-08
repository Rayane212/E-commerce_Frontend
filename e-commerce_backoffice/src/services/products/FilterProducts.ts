import { Product } from '../../models/products/Product';

export default function FilterProducts(data: Product[]) {
  const available_products = filterAvailableProducts(data);
  const unavailable_products = filterUnvailableProducts(data);
  const out_of_stock_products = filterOutOfStockProducts(data); 

  function filterAvailableProducts(data: Product[]): Product[] {
    return data.filter(product => product.is_listed);
  }

  function filterUnvailableProducts(data: Product[]): Product[] {
    return data.filter(product => !product.is_listed);
  }

  function filterOutOfStockProducts(data: Product[]): Product[] {
    return data.filter(product => product.stock === '0');
  }

  return {
    available_products,
    unavailable_products,
    out_of_stock_products,
  };
}
