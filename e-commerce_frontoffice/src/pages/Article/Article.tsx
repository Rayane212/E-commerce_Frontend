import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export default function Article() {
  let id: number | undefined;

  const param = useParams()["id"];

  if (param !== undefined) {
    id = parseInt(param);
  }

  let data = useFetch(`https://fakestoreapi.com/products${id}}`);
  console.log(data);

  return <div></div>;
}
