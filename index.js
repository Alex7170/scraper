import cheerio from "cheerio"
import { LAUNCH_PUPPETEER_OPTS, PAGE_PUPPETEER_OPTS } from "./options.js"
import puppeteer from "puppeteer"
import {parser} from "./helpers/parser.js"
import {excel} from "./helpers/convert.js"


export const main = async (isTest) =>{
    try{
        const data =[]
        const site = "https://www.dent.cz"  
        const mainUrl = "/zubni-lekari"
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS)
        const page = await browser.newPage()
        await page.goto(site+mainUrl, PAGE_PUPPETEER_OPTS)
        while (true){
            const content = await page.content() 
            const $ = cheerio.load(content)
            $(".cross-dentists-list__item").each((i, elem)=>{
                const url = $(elem).find("h3 a").attr('href')
                const title = $(elem).find("h3 a").text()
                const tel = $(elem).find('strong:contains("Tel") a').text()
                const email = $(elem).find('a:contains("@")').text()
                if (tel != '') var adres = $(elem).find("p").text().split("Tel.")[0]
                else if (tel == '' && email != '') adres = $(elem).find("p").text().split("E-mail")[0]
                else adres = $(elem).find("p").text().split("Zobrazit více")[0]
                data.push({title, adres, tel, email, url})
            })
            const pageNumber = $('.box-pager__item:contains("/")').text().split(' /')
            if (isTest && pageNumber[0] == '2') break 
            if (pageNumber[0] == pageNumber[1]) break
            await page.click(".box-pager__btn--next")
            await new Promise((resolve, reject) => {
                setTimeout(() => resolve(), 300) // change this digit to 500 or 1000 if it'l have some problems with getting data from site
            })
        }
        for (const item of data){
            const link = `${site}${item.url}`
            await page.goto(link)
            const content = await page.content()
            const $ = cheerio.load(content)
            delete item.url
            item.doctors = parser($(".box-detail__item").find('p:contains("Zubní lékaři:")').next().text())
        }
        browser.close()
        excel(data)
        if (isTest) console.log(data)
        console.log("file.xlsx is created")
    } catch(e){
        console.log("ERROR HAS OCURED!!! :" , e)
    }
    
}
main(false)
