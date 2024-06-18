import * as z from 'zod'
import axios, { AxiosResponse } from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { EditSubjectSchema } from "@/schema";
import { GetSubjectsResponse } from '@/types';

export async function getSubjects():Promise<AxiosResponse<GetSubjectsResponse, any>>  {
  const token = getCookie('token')
  return await axios.get(useAPI('subjects'), headers(token))
}

export async function getSubject(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`subjects/${id}`), headers(token))
}

export async function updateSubject(id: string, values: z.infer<typeof EditSubjectSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`subjects/${id}`), values, headers(token))
}

export async function addSubject(values: z.infer<typeof EditSubjectSchema>) {
  const token = getCookie('token')
  return await axios.post(useAPI(`subjects`), values, headers(token))
}

export async function deleteSubject(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`subjects/${id}`), headers(token))
}