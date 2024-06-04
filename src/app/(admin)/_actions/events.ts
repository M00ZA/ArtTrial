import * as z from 'zod'
import axios from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { EditEventSchema } from "@/schema";
import { IPaginationParams } from '@/types';


export async function getEvents(params: IPaginationParams|undefined) {
  const token = getCookie('token')
  console.log("----------------------------------------------------------------")
  console.log(token)
  return await axios.get(useAPI(`events`), {...headers(token),params})
}

export async function getEvent(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`events/${id}`), headers(token))
}

export async function getMeEvent(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`events/me/${id}`), headers(token))
}

export async function updateEvent(id: string, values: z.infer<typeof EditEventSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`events/${id}`), values, headers(token))
}

export async function deleteEvent(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`events/${id}`), headers(token))
}