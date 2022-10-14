import { LAUNCH_PUPPETEER_OPTS, PAGE_PUPPETEER_OPTS } from "../options"
import puppeteer from "puppeteer"

export default async function getContent (url){
    try{
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS)
        const page = await browser.newPage()
        await page.goto(url, PAGE_PUPPETEER_OPTS)
        const content = await page.content()
        browser.close()
        return content
    } catch(e){
        throw(e)
    }
}