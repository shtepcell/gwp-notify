import { v2 } from '@google-cloud/translate'
import { credentials } from './credentials.js';
 
const translate = new v2.Translate({
    credentials,
})

export async function translateText(text) {
    let [translations] = await translate.translate(text, 'en');
    translations = Array.isArray(translations) ? translations : [translations];
  
    return translations.join('\n');
}