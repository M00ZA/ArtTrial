import * as z from 'zod'
import axios from "axios";

import { getCookie } from "cookies-next";
import { headers, useAPI } from "@/lib/utils";
import { EditArtistSchema } from "@/schema";

export async function getArtists() {
  const token = getCookie('token')
  return await axios.get(useAPI(`artists`), headers(token))
}

export async function getArtist(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`artists/${id}`), headers(token))
}

export async function updateArtist(id: string, values: z.infer<typeof EditArtistSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`artists/${id}`), values, headers(token))
}

export async function deleteArtist(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`artists/${id}`), headers(token))
}