interface ProductModel {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  size: string[];
  rating: {
    rate: number;
    count: number;
  };
}

export default ProductModel;
