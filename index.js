const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = 3001
const app = express();
const title = "caleb-plant"

//if fighter was caleb then webfix needs to be the first letter (c) so if it was tyson it would be (t)
const webFix = title[0]

url = `https://www.martialbot.com/boxing/${webFix}/${title}.html`
async function scrapeData() {
    try {
        const { data } = await axios.get(url)
        const $ = cheerio.load(data);
        const record = $('#record-div');
        const tables = record.find('table');

        const result = [];

        tables.each((i, table) => {
            const rows = $(table).find('tr');
            const tableResult = {};

            rows.each((j, row) => {
                const th = $(row).find('th').text().trim();
                const td = $(row).find('td').text().trim();
                tableResult[th] = td;
            });

            result.title = title;
            result.push(tableResult);
        });


        console.log(result);

    } catch (err) {
        console.log(err)
    }
}
scrapeData();
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

