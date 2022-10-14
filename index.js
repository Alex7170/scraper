import cheerio from "cheerio"
import getContent from "./helpers/getContent.js"


const data =[]
const site = "https://www.dent.cz"  
const mainUrl = "/zubni-lekari"

const main = async () =>{
    try{
        const content = await getContent(site + mainUrl)
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
        for (const item of data){
            const link = `${site}${item.url}`
            const content = await getContent(link)
            const $ = cheerio.load(content)
            delete item.url
            item.doctors = $(".box-detail__item").find('p:contains("Zubní lékaři:")').next().text()
        }
        console.log(data)
    } catch(e){
        console.log("ERROR HAS OCURED!!! :" , e)
    }
    
}
main()
