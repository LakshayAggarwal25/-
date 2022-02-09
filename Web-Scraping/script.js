// node .\script.js --name='iphone 12'

let minimist = require("minimist");
let fs = require("fs");
let axios = require("axios");
let jsdom = require("jsdom");
let excel = require("excel4node");
let https = require('https');

let args = minimist(process.argv);
// console.log(args.name);

let stringArray = args.name.split(" ");

let flipkartString = "";
for (let i = 0; i < stringArray.length; i++) {
    flipkartString += stringArray[i] + "%20";
}

let flipkartLink = "https://www.flipkart.com/search?q=" + flipkartString;

// console.log(flipkartLink);

let wb = new excel.Workbook();

let flipkartDownloadPromise = axios.get(flipkartLink);
flipkartDownloadPromise
    .then(function (response) {
        let html = response.data;
        let dom = new jsdom.JSDOM(html);
        let document = dom.window.document;

        let flipkartItems = [];
        let flipkartItemsBlocks = document.querySelectorAll("div._2kHMtA");
        for (let i = 0; i < flipkartItemsBlocks.length; i++) {
            let flipkartItem = {};
            let itemName = flipkartItemsBlocks[i].querySelector("div._4rR01T");
            flipkartItem.Name = itemName.textContent;

            let itemPriceOnFlipkart = flipkartItemsBlocks[i].querySelector("div._30jeq3._1_WHN1");
            flipkartItem.PriceOnFlipkart = itemPriceOnFlipkart.textContent;

            let itemMrp = flipkartItemsBlocks[i].querySelector("div._3I9_wc._27UcVY");
            flipkartItem.Mrp = itemMrp.textContent;

            let itemLinkTag = flipkartItemsBlocks[i].querySelector("a");
            let itemLink = "https://www.flipkart.com" + itemLinkTag.href;
            flipkartItem.Link = itemLink;

            let productDetailsArray = [];
            let productDetailsList = flipkartItemsBlocks[i].querySelectorAll("li.rgWa7D");
            for (let listItr = 0; listItr < productDetailsList.length; listItr++) {
                productDetailsArray.push(productDetailsList[listItr].textContent);
            }
            flipkartItem.ProductDetails = productDetailsArray;

            let itemImageLink = flipkartItemsBlocks[i].querySelector("img").src;
            flipkartItem.ImgLink = itemImageLink;

            let url = itemImageLink;
            let pathInLocal;
            https.get(url, (res) => {
                pathInLocal = "item"+(i+1)+".jpeg";
                let filePath = fs.createWriteStream(pathInLocal);
                res.pipe(filePath);
                filePath.on('finish', () => {

                    flipkartItem.ImgLink = "L:/Web-Dev Projects/Web-Scraping/"+pathInLocal;
                    flipkartItems.push(flipkartItem);
                    filePath.close();
                })
            })
        }


        setTimeout(function () {
            let flipkartJSON = JSON.stringify(flipkartItems);
            fs.writeFileSync("Products.JSON", flipkartJSON, "utf-8");

            for (let i = 0; i < flipkartItems.length; i++) {
                let sheet = wb.addWorksheet("Item - " + (i + 1));
                sheet.column(1).setWidth(40);
                sheet.column(2).setWidth(40);
                let boldStyle = wb.createStyle({
                    font: {
                        bold: true,
                        size: 14
                    },
                    alignment: {
                        horizontal: "center",
                        vertical: "center"
                    }
                });
                let normalStyle = wb.createStyle({
                    font: {
                        size: 12
                    },
                    alignment: {
                        horizontal: "center",
                        wrapText: true
                    }
                });
                let listStyle = wb.createStyle({
                    font: {
                        size: 12
                    },
                    alignment: {
                        horizontal: "left",
                        wrapText: true
                    }
                })

                sheet.addImage({
                    path: flipkartItems[i].ImgLink,
                    type: 'picture',
                    position: {
                        type: 'oneCellAnchor',
                        from: {
                            col: 3,
                            colOff: '0.5in',
                            row: 1,
                            rowOff: 0,
                        },
                    },
                });


                sheet.cell(1, 1).string("Product Name").style(boldStyle);
                sheet.cell(1, 2).string(flipkartItems[i].Name).style(normalStyle);
                sheet.cell(2, 1).string("Product MRP").style(boldStyle);
                sheet.cell(2, 2).string(flipkartItems[i].Mrp).style(normalStyle);
                sheet.cell(3, 1).string("Price on Flipkart").style(boldStyle);
                sheet.cell(3, 2).string(flipkartItems[i].PriceOnFlipkart).style(normalStyle);
                sheet.cell(4, 1).string("Link").style(boldStyle);
                sheet.cell(4, 2).link(flipkartItems[i].Link, "Product Link").style(normalStyle);
                sheet.cell(5, 1, 6, 2, true).string("Product Details").style(boldStyle);
                for (let j = 0; j < flipkartItems[i].ProductDetails.length; j++) {
                    sheet.cell(7 + j, 1, 7 + j, 2, true).string(flipkartItems[i].ProductDetails[j]).style(listStyle);
                }

                wb.write("Products.xlsx");

            }
        }, 10000);
    })
    .catch(function (err) {
        console.log(err.message);
    });
