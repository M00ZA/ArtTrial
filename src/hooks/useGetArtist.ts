import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { Artist, User } from "@/types";
import { headers, useAPI } from "@/lib/utils";

import axios from "axios";

export function useGetArtist(id: string) {
  const api = useAPI(`artists/${id}`)
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['arists', id],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched } = query

  const artist: Artist = query.data?.data?.data

  return { artist, isLoading, isFetched, query }
}
