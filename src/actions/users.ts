import { headers, useAPI } from "@/lib/utils"
import { UpdateMyAdminPassword } from "@/schema"
import { User } from "@/types"
import axios from "axios"
import { getCookie } from "cookies-next"
import * as z from 'zod'

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

  export async function createCashOrder(shippingAddress:string,cartId:string){
    const token = getCookie('token')
    return await axios.post(useAPI(`order/cash/${cartId}`),{shippingAddress}, headers(token))
  }

  export async function createCheckoutSession(shippingAddress:string,cartId:string){
    const token = getCookie('token')
    return await axios.post(useAPI(`order/cash/${cartId}`),{shippingAddress}, headers(token))
  }

  export async function getMyOrders() {
    const token = getCookie('token')
    return await axios.get(useAPI(`order/me`), headers(token))
  }

  export async function getOrder(orderId:string) {
    const token = getCookie('token')
    return await axios.get(useAPI(`order/${orderId}`), headers(token))
  }

  export async function getProfileAdresses() {
    const token = getCookie('token')
    return await axios.get(useAPI(`users/address`), headers(token))
  }

  export async function deleteCartProduct(id:string) {
    const token = getCookie('token')
    return await axios.delete(useAPI(`cart/${id}`), headers(token))
  }

  // users/updateProfile
  export async function updateUserProfile(userProfile:Partial<User>) {
    const token = getCookie('token')
    return await axios.patch(useAPI(`users/updateProfile`),userProfile, headers(token))
  }


  export async function updateUserImg(values: any) {
    const token = getCookie('token')
    return await axios.putForm(useAPI(`users/updateImage`), values, headers(token))
  }

  export async function updateUserPassword(values: z.infer<typeof UpdateMyAdminPassword>) {
    const token = getCookie('token')
    return await axios.patch(useAPI(`users/changePassword`), values, headers(token))
  }
  