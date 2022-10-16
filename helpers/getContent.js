import { LAUNCH_PUPPETEER_OPTS, PAGE_PUPPETEER_OPTS } from "../options.js"
import puppeteer from "puppeteer"

export const getContent = async (url) =>{
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