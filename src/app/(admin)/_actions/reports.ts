import { headers, useAPI } from "@/lib/utils"
import { GetAllProductsReportResponse, GetArtistStatisticReportResponse, GetLastAuctionsReportResponse, GetLastEventsReportResponse, GetSingleArtistStatisticReportResponse, GetUnavailableProductsReportResponse, IPaginationParams } from "@/types"
import axios, { AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

export async function getAllProductsReport(params: IPaginationParams|undefined={}):Promise<AxiosResponse<GetAllProductsReportResponse, any>> {
    const token = getCookie('token')
    return await axios.get(useAPI(`reports/availableProductReport`), {...headers(token),params})
  }

  export async function getUnavailableProductsReport(params: IPaginationParams|undefined={}):Promise<AxiosResponse<GetUnavailableProductsReportResponse, any>> {
    const token = getCookie('token')
    return await axios.get(useAPI(`reports/unAvailableProductsReport`), {...headers(token),params})
  }

  
  export async function getArtistStatisticReport(params: IPaginationParams|undefined={}):Promise<AxiosResponse<GetArtistStatisticReportResponse, any>> {
    const token = getCookie('token')
    return await axios.get(useAPI(`reports/artistStatisticReport`), {...headers(token),params})
  }

  export async function getSingleArtistStatisticReport(id: string,params: IPaginationParams|undefined={}):Promise<AxiosResponse<GetSingleArtistStatisticReportResponse, any>>  {
    const token = getCookie('token')
    return await axios.get(useAPI(`reports/singleArtistStatisticReport/${id}`), {...headers(token),params})
  }

  export async function getLastEventsReport(params: IPaginationParams|undefined={}):Promise<AxiosResponse<GetLastEventsReportResponse, any>> {
    const token = getCookie('token')
    return await axios.get(useAPI(`reports/lastEventsReport`), {...headers(token),params})
  }

  export async function getLastAuctionsReport(params: IPaginationParams|undefined={}):Promise<AxiosResponse<GetLastAuctionsReportResponse, any>>  {
    const token = getCookie('token')
    return await axios.get(useAPI(`reports/lastAuctionsReport`), {...headers(token),params})
  }


  
  
  
  