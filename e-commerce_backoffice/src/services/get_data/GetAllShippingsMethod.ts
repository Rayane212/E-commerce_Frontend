import React from "react";
import { ShippingMethod } from "../../models/ShippingMethod";
import shipping_methods from "../../data/json/shipping_methods.json";

let isRequest: boolean = false;

export default function GetAllShippingsMethod() {
  if (isRequest) {
    return [];
  }
  isRequest = true;
  const data: ShippingMethod[] = shipping_methods;
  isRequest = false;
  return data;
}