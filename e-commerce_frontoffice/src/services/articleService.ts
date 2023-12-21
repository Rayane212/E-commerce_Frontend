import ProductModel from "../models/ProductModel";
const baseArticle = 'https://fakestoreapi.com/products';

class ArticleService {
  public async getArticles(): Promise<ProductModel[]> {
    const response = await fetch(baseArticle);
    const data = await response.json();
    return data;
  } 

    public async getArticle(id: string): Promise<ProductModel> {
        const response = await fetch(`${baseArticle}/${id}`);
        const data = await response.json();
        return data;
    }
}

export default new ArticleService();
