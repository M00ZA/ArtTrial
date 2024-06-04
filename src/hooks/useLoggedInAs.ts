import { getProfile } from "@/actions/generic";
import { User } from "@/types";
import { QueryObserverResult, RefetchOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { setCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface IReturn{
    refetch:(options?: RefetchOptions | undefined) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>,
    loggedInAs:string|undefined,
    memberProfile:any
}

export function useLoggedInAs(endpoint:string,type:string|null):IReturn {
    const pathname = usePathname();
    const queryClient = useQueryClient();
  
    console.log("useLoggedInAs")
    const memberType = type || "user";
  
    useEffect(() => {
      queryClient.invalidateQueries({ queryKey: [memberType, "profile"] });
    }, [pathname]);
  
    const profileQuery = useQuery({
      queryKey: [memberType, "profile"],
      queryFn: () => getProfile(endpoint),
    });
  
    const { data,  isFetched ,refetch } = profileQuery;
  
    const msg = data?.data?.message;
    let loggedInAs = msg?.includes("user")
      ? "user"
      : msg?.includes("artist")
      ? "artist"
      : undefined;
  
    let memberProfile: User = data?.data?.data;

    if (isFetched) {
        console.log(data?.data?.message);
    
        setCookie("loggedInAs", loggedInAs);
    
        setCookie("memberProfile", memberProfile);
      }
  
      return {refetch,loggedInAs,memberProfile}

  }
  