import { headers, useAPI } from "@/lib/utils"
import axios from "axios"
import { getCookie } from "cookies-next"

export async function getOrders() {
    const token = getCookie('token')
    return await axios.get(useAPI(`order`), {...headers(token)})
  }
  