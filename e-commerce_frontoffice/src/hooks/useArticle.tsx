import React, { useEffect, useRef, useState } from "react";
import ProductModel from "../models/ProductModel";
import { useParams } from "react-router-dom";
import articleService from "../services/articleService";

export default function useArticle(id?: string) {
  const [article, setArticle] = useState<ProductModel | ProductModel[]>(
    [] as ProductModel[]
  );
  //const id = useParams()["id"];
  const init = async () => {
    if (id) {
      const data = await articleService.getArticle(id!);
      setArticle(data);
    } else {
      const data = await articleService.getArticles();
      setArticle(data);
    }
    isLoading.current = false;
  };

  const isLoading = useRef(false);

  useEffect(() => {
    if (!isLoading.current) {
      isLoading.current = true;
      init();
      console.log("loading :", id);
    }
    console.log("useEffect :", id);
  }, []);
  return { article };
}
