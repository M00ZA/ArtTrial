import * as z from 'zod'
import axios from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { AddAdminSchema, EditAdminSchema, UpdateMyAdminPassword, UpdateMyAdminProfileSchema } from "@/schema";

export async function getAdmins() {
  const token = getCookie('token')
  return await axios.get(useAPI(`admins`), headers(token))
}

export async function getAdmin(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`admins/${id}`), headers(token))
}

export async function addAdmin(values: z.infer<typeof AddAdminSchema>) {
  const token = getCookie('token')
  return await axios.post(useAPI(`admins`), values, headers(token))
}

export async function updateAdmin(id: string, values: z.infer<typeof EditAdminSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`admins/${id}`), values, headers(token))
}
export async function updateAdminAccount(values: z.infer<typeof UpdateMyAdminProfileSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`admins/updateProfile`), values, headers(token))
}
export async function updateAdminPicture(values: any) {
  const token = getCookie('token')
  return await axios.put(useAPI(`admins/updateImgProfile`), values, headers(token))
}

export async function updateAdminPassword(values: z.infer<typeof UpdateMyAdminPassword>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`admins/changePassword`), values, headers(token))
}

export async function deleteAdmin(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`admins/${id}`), headers(token))
}

