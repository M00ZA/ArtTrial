import { headers, useAPI } from "@/lib/utils"
import { changeOrderStateSchema } from "@/schema";
import axios from "axios"
import { getCookie } from "cookies-next"
import * as zod from "zod";

export async function getOrders() {
    const token = getCookie('token')
    return await axios.get(useAPI(`order`), {...headers(token)})
  }
  
  export async function updateOrderState(id:string,params:zod.infer<typeof changeOrderStateSchema>) {
    const token = getCookie('token')
    return await axios.patch(useAPI(`order/${id}/state`),params ,{...headers(token)})
  }

  export async function updateOrderToPaid(id:string) {
    const token = getCookie('token')
    return await axios.patch(useAPI(`order/${id}/paid`),undefined ,headers(token))
  }

  export async function updateOrderToDelivered(id:string) {
    const token = getCookie('token')
    return await axios.patch(useAPI(`order/${id}/delivered`), undefined,headers(token))
  }