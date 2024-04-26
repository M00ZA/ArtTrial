import { COOKIE_LANG } from "@/lib/constants";
import { getCookie, setCookie } from "cookies-next";

export function useLang() {
  let language = getCookie(COOKIE_LANG)

  const changeLanguage = (lang: string) => {
    setCookie(COOKIE_LANG, lang)
  }

  return { language, changeLanguage }
}