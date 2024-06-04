import { headers, useAPI } from "@/lib/utils"
import axios from "axios"
import { getCookie } from "cookies-next"

export async function getUserEvents() {
    const token = getCookie('token')
    return await axios.get(useAPI(`bookEvent`), headers(token))
  }

  export async function bookEvent() {
    const token = getCookie('token')
    return await axios.post(useAPI(`bookEvent`), headers(token))
  }