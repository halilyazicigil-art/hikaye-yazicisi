import en from '../locales/en.json'
import tr from '../locales/tr.json'

type Language = 'en' | 'tr'

const dictionaries = { en, tr }

export const getDictionary = (lang: Language) => {
  return dictionaries[lang] || dictionaries.en
}
