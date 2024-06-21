import * as z from 'zod'
import axios from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { EditEventSchema, addEventSchema, addProductSchema } from "@/schema";
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

export async function getMeEvents(params: IPaginationParams|undefined) {
  const token = getCookie('token')
  console.log("----------------------------------------------------------------")
  console.log(token)
  return await axios.get(useAPI(`events/me`), {...headers(token),params})
}

export async function addEvent( values: z.infer<typeof addEventSchema>) {
  const token = getCookie('token')
  return await axios.postForm(useAPI(`events`), values, headers(token))
}

export async function deleteMeEvent(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`events/me/${id}`), headers(token))
}

export async function updateMeEvent(id: string, values: z.infer<typeof EditEventSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`events/me/${id}`), values, headers(token))
}

export async function addProductToEvent(id: string, values: z.infer<typeof addProductSchema>) {
  const token = getCookie('token')
  return await axios.post(useAPI(`events/${id}/addProduct`), values, headers(token))
}