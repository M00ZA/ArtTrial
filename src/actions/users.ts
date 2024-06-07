import { headers, useAPI } from "@/lib/utils"
import axios from "axios"
import { getCookie } from "cookies-next"

export async function getUserEvents() {
    const token = getCookie('token')
    return await axios.get(useAPI(`bookEvent`), headers(token))
  }

  export async function bookEvent(id:string) {
    const token = getCookie('token')
    return await axios.post(useAPI(`bookEvent/${id}`),null, headers(token))
  }

  export async function getMyCart() {
    const token = getCookie('token')
    return await axios.get(useAPI(`cart`), headers(token))
  }

  export async function addProductToCart(productId:string) {
    const token = getCookie('token')
    return await axios.post(useAPI(`cart`),{productId}, headers(token))
  }
