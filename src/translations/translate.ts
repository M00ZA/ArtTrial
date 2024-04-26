import { EnglishPhrases } from './english'
import { ArabicPhrases } from './arabic'

import { getCookie } from 'cookies-next';
import { COOKIE_LANG } from '@/lib/constants';

type Language = 'english' | 'arabic'

export default function translate(phrase: string) {

  const language: Language = getCookie(COOKIE_LANG) as Language ?? "english"

  if (language === 'english') {
    return EnglishPhrases[phrase] ?? 'tt:' + phrase
  } else if (language === 'arabic') {
    return ArabicPhrases[phrase] ?? 'tt:' + phrase
  }

} 