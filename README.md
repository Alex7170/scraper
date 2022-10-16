Scrapper based on puppeteer and cheerio with convertation data in .xls file.

IMPORTANT INFORMATION

Install modules (necessary) by command: "npm i"

At first i recomend you to run a test version by command "npm run test".

That is short version of programm that will show is everything is fine. 

If there will be some problems at first follow this:

1) If you have a problem with scrapping data from website change this:
    scraper/index.js, row 34  -  digit at the end of expression depends on your internet connection, change it to 500 or higher and run "npm run test" again.
2) If you want to change file path:
    scraper/index.js, row 46  -  by changing file path inside "{path}". Don't forget to add .xls at the end (nut also you can try with other extensions)  

If your problem is not solved contact me at https://github.com/Alex7170 or email yaroshenko.sashko@gmail.com.

STARTING PROGRAMM

Install modules (necessary) by command: "npm i"
Run it with: "npm run start"




