import { useParams } from "react-router-dom";
import ProductModel from "../../models/ProductModel";
import useArticle from "../../hooks/useArticle";
import "./Article.css";
import StarRating from "../../components/starRating/StarRating";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import formatCurrency from "../../utils/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function Article() {
  const { article } = useArticle(useParams()["id"]) as {
    article: ProductModel;
  };

  const [amount, setAmount] = useState(0);

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const { increaseCartQuantity } = useShoppingCart();

  return (
    <div className="article">
      <img src={article?.image} alt={article?.title} />
      <div className="infos">
        <div className="text">
          <h3>{article?.title}</h3>
          <span>{article?.category}</span>
          <p>{formatCurrency(article?.price)}</p>
          <p className="desc">{article?.description}</p>
        </div>
        <div className="colors">
          <span className="circle white"></span>
          <span className="circle black-blue"></span>
          <span className="circle grey-red"></span>
          <span className="circle brown-green"></span>
          <span className="circle black-white"></span>
          <span className="circle grey-orange"></span>
          <span className="circle blue-white"></span>
        </div>
        <div className="sizes">
          <ul>
            {article.size && article.size.length > 0 ? (
              article.size.map((size, index) => <li key={index}>{size}</li>)
            ) : (
              <p>No sizes available</p>
            )}
          </ul>
        </div>
        <div className="amount">
          <button onClick={decreaseAmount}>
            <FiMinus />
          </button>
          <span>{amount}</span>
          <button onClick={increaseAmount}>
            <FiPlus />
          </button>
        </div>
        {/* <div className="rating">
          <StarRating rating={article?.rating.rate} />
          <span>{article?.rating.count}</span>
        </div> */}
        <button
          onClick={() => {
            increaseCartQuantity(article?.id);
          }}
          className="add-to-cart"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
