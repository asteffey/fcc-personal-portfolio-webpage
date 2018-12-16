const fs = require("fs");
const puppeteer = require('puppeteer');
const jimp = require('jimp');

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

const DEFAULT_THUMBNAIL_WIDTH = 400;
const DEFAULT_THUMBNAIL_HEIGHT = 300;

config = JSON.parse(fs.readFileSync("config.json"));


(async () => {
    const browser = await puppeteer.launch();
    for (let site of config.sites) {
        const page = await browser.newPage();
        await page.goto(site.url);
        await page.setViewport({
            width: site.width ? site.width : DEFAULT_WIDTH,
            height: site.height ? site.height : DEFAULT_HEIGHT
        });
        await page.screenshot({
            path: config.path + site.out
        });
        console.log("saving " + config.path + site.out);
    }
    await browser.close();
})().then(() => {
    for (let site of config.sites) {
        jimp.read(config.path + site.out)
            .then(img => {
                img
                    .resize(site.thumbnail_width ? site.thumbnail_width : DEFAULT_THUMBNAIL_WIDTH, site.thumbnail_height ? site.thumbnail_height : DEFAULT_THUMBNAIL_HEIGHT) // resize
                    .write(config.thumbnail_path + site.out); // saves
                console.log("saving " + config.thumbnail_path + site.out);
                return img;
            })
            .catch(err => {
                console.error(err);
            });
    }
});
