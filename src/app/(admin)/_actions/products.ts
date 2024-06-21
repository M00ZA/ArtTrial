import * as z from 'zod'
import axios from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { AddProductSchema, AddProductToAuctionSchema, EditArtWorkSchema, EditProductSchema, EditUserSchema, addProductSchema } from "@/schema";
import { IPaginationParams } from '@/types';


export async function getProducts(params: IPaginationParams|undefined={}) {
  const token = getCookie('token')
  return await axios.get(useAPI(`products`), {...headers(token),params})
}

export async function getProduct(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`products/${id}`), headers(token))
}

export async function getMeProduct(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`products/me/${id}`), headers(token))
}

export async function updateProduct(id: string, values: z.infer<typeof EditProductSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`products/${id}`), values, headers(token))
}

export async function updateMeProduct(id: string, values: z.infer<typeof EditArtWorkSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`products/me/${id}`), values, headers(token))
}

export async function deleteProduct(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`products/${id}`), headers(token))
}

export async function deleteMyProduct(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`products/me/${id}`), headers(token))
}

export async function getMeProducts(params: IPaginationParams|undefined={}) {
  const token = getCookie('token')
  return await axios.get(useAPI(`products/me`), {...headers(token),params})
}


export async function addNewProduct( values: z.infer<typeof AddProductSchema>) {
  const token = getCookie('token')
  const myFormData = new FormData()
  for(const [key,value] of Object.entries(values)){

    if(key == "images"){
        values.images.forEach((element: string | Blob) => {
        console.log("element",element)
        myFormData.append("images",element)
    });
    }else{
      myFormData.append(key,value)
    }

    
  }
  console.log(JSON.stringify(myFormData))
  // return await axios.post(useAPI(`products`), values, headers(token))
  return await axios({
    method:"post",
    url:useAPI(`products`),
    data:myFormData,
    headers:{
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  })
}


export async function addNewProductToAuction( values: z.infer<typeof AddProductToAuctionSchema>) {
  const token = getCookie('token')
  const myFormData = new FormData()
  for(const [key,value] of Object.entries(values)){

    if(key == "images"){
        values.images.forEach((element: string | Blob) => {
        console.log("element",element)
        myFormData.append("images",element)
    });
    }else{
      myFormData.append(key,value)
    }

    
  }
  console.log(JSON.stringify(myFormData))

  // return await axios.post(useAPI(`products`), values, headers(token))
  return await axios({
    method:"post",
    url:useAPI(`auction`),
    data:myFormData,
    headers:{
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  })
}

