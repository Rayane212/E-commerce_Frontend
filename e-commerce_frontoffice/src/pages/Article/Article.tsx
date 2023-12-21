import { useParams } from "react-router-dom";
import ProductModel from "../../models/ProductModel";
import useArticle from "../../hooks/useArticle";

export default function Article() {
  const { article } = useArticle(useParams()["id"]) as {
    article: ProductModel;
  };

  return (
    <div>
      <img src={article?.image} alt={article?.title} />
      <div className="infos">
        <h3>{article?.title}</h3>
        <p>{article?.category}</p>
        <p>{article?.price}€</p>
      </div>
      <p className="desc">{article?.description}</p>
      <button className="cta">Ajouter au panier</button>
    </div>
  );
}
