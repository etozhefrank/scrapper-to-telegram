import cherio from "cherio";
import {getPageContent} from "./helpers/puppeteer";
import chalk from 'chalk';
require('events').EventEmitter.defaultMaxListeners = Infinity;
const SITE = `https://inde.io/cat/2-chto-proishodit/`;
const db = require('./db');

(async function main() {
    console.log('Parsing has been started...')
        try {
            const url = `${SITE}`
            console.log(url)
            const pageContent = await getPageContent(url)
            const $ = cherio.load(pageContent)

            $('.stream-item').find('.stream-item__title').each((i, header) => {
                const urlpost = $(header).attr('href')
                let content = $(header).text()
                const fullUrl = 'https://inde.io/'+urlpost
                const newsPost = db.query(`INSERT INTO scrapper (content, urlpost) values ($1, $2) RETURNING *`, [content, fullUrl])
            })


        } catch (err) {
            console.log(chalk.red('An error has occured'))
            console.error(err)
        }
    console.log('Parsing has been ended!')
    }
)()

