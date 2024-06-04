import { useSearchParams } from "next/navigation";

export function useSearchType(artistEndpoint:string,userEndpoint:string) {
    const type = useSearchParams().get("type");
    const endpoint = type == "artist" ? artistEndpoint : userEndpoint;
  
    return { endpoint, type }
  }