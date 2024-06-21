import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_URL } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ParamType = {
  key: string,
  value: string
}

export function useAPI(url: string, params?: ParamType[]) {
  let query = API_URL + url + '?'
  if (params && params?.length > 0) {
    params.forEach(item => {
      query += item.key + '=' + item.value + "&"
    })
  }
  if (query.endsWith('&') || query.endsWith('?')) {
    query = query.slice(0, query.length - 1)
  }
  return query
}

export function captilize(str: string) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

export function formatMoney(money: number, locales = 'en-IN', options = {
  style: 'currency',
  currency: 'EGP',
  maximumSignificantDigits: 5,
  minimumSignificantDigits: 3
}) {
  return new Intl.NumberFormat('en-IN', options).format(money)
}

export function formatNumber(num: number) {
  return Intl.NumberFormat().format(num)
}

export function headers(token: string | undefined) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
}

// export function headers(token: string | undefined) {
//   return {
//     headers: {
//       accesstoken: `accesstoken_${token}`,
//     }
//   }
// }

export function formatDate(date: string, format = {
  year: 'numeric',
  month: 'long', 
  day: 'numeric',
  hour: "numeric",
  minute: "numeric",
}) {
  return new Date(date).toLocaleDateString("en-US", format as any)
}

export function isValidDate(dateString:string) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  const isFutureDate = (new Date()).getTime() < dNum
  return d.toISOString().slice(0,10) === dateString && isFutureDate;
}