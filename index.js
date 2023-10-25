import { chromium } from "playwright";
import { format } from 'date-fns'

import 'dotenv/config'

import { translateText } from "./utils/translate.js"
import { sendMessage } from "./utils/telegram.js";
import { isChecked } from "./utils/checks.js";

const T_CHAT = process.env.T_CHAT

const triggerGeorgianWords = ["წერეთელის", "დიდუბის რაიონი"];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Opening GWP...');

  await page.goto("https://www.gwp.ge/ka/gadaudebeli");

  const date = format(new Date(), "dd/MM/yyyy");

  console.log(`Selecting date ${date}...`);

  await page.getByRole("link", { name: date, exact: true }).click();

  await page.waitForSelector(".initial");

  const texts = await page.locator(".initial li").allInnerTexts()
  
  await browser.close();
  
  console.log('Parsing texts...');

  const triggeredTexts = texts.filter((text) => triggerGeorgianWords.some(word => text.includes(word)))
  
  if (triggeredTexts.length === 0) {
    return;
  }

  if (await isChecked(triggeredTexts)) {
    console.log('Already checked!')
    return;
  }

  console.log('Translating...');

  const translatedText = await translateText(triggeredTexts.join('\n'))
  
  console.log('Sending notification...');


  const message = `*Scan time: ${format(new Date(), "dd/MM/yyyy HH:mm:ss")}*\n\n${translatedText}`
  
  await sendMessage(T_CHAT, message);
  
  console.log('Fucking GWP!!!')
})();
