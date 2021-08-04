import {getPageContent} from "../helpers/puppeteer";
import chalk from "chalk";
import cherio from "cherio";

export default async function listItemsHandler(data) {
    try {
        for (const initialData of data) {
            console.log(chalk.green(`Getting data from `) +chalk.green.bold(initialData.url))
            const detailContent = await getPageContent(initialData.url)
            const $ = cherio.load(detailContent)

            const title = $('.fz--22')
                .clone()
                .children()
                .remove()
                .end()
                .text()

            console.log(title)

        }
    } catch (err) {
        throw err
    }
}
