var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
const fs = require("fs");

class Shoter {
    constructor(viewport, url, path) {


        var driver = this.driver = new webdriver.Builder().withCapabilities({
            'browserName': 'firefox',
            acceptSslCerts: true,
            acceptInsecureCerts: true
        }).build();

        driver.manage().window().setSize(viewport.viewport.width, viewport.viewport.height + 78);

        driver.get(url).then(()=>{

            driver.executeScript("var css = 'body{overflow:hidden!important;}';var style = document.createElement('style');style.innerHTML = css;var head = document.getElementsByTagName('head')[0].appendChild(style);var body = document.body,html = document.documentElement;var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );return height;").then((height) => {

                driver.executeScript("window.scrollTo(0,document.body.scrollHeight)");

                var viewPortHeight = viewport.viewport.height;
                var times = parseInt(height / viewPortHeight);

                this.scrollTheWindow(times,viewPortHeight);

                for (let i = 0; i < times; i++) {
                    if(i==1){
                        this.injectFixedHideElementsScript();
                    }
                    driver.executeScript("window.scrollTo(0," + viewPortHeight * i + ")");
                    driver.sleep(1500).then(function () {
                        driver.takeScreenshot(true).then(
                            function (image, err) {
                                require('fs').writeFile(`${path}out-${i}.png`, image, 'base64', function (err) {
                                    console.log(err);
                                });
                            }
                        );
                    })
                }

                //last screen shot:)

                var remaining = height + 78 - (times * viewPortHeight);

                driver.manage().window().setSize(viewport.viewport.width, remaining);

                driver.executeScript("window.scrollTo(0," + height + ")");
                driver.sleep(1500).then(function () {
                    driver.takeScreenshot(true).then(
                        function (image, err) {
                            fs.writeFileSync(`${path}out-${times}.png`, image, 'base64', function (err) {
                                console.log(err);
                            });


                            var Merger = require("./merger");

                            new Merger(times + 1, path, viewport.name).then(function (path) {

                                for (let i = 0; i < times + 1; i++) {
                                    fs.unlinkSync(`${path}out-${i}.png`);
                                }

                            });



                        }



                    );
                })




            })

        });


        driver.quit();

    }

    scrollTheWindow(times,viewPortHeight){

        for (let i = 0; i < times; i++) {
            this.driver.executeScript("window.scrollTo(0," + viewPortHeight * i + ")");
            this.driver.sleep(1500);
        }

    }

    injectFixedHideElementsScript(){
        this.driver.executeScript("var divs = document.getElementsByTagName('div');for(let i=0;i<divs.length;i++){if(window.getComputedStyle(divs[i],null).getPropertyValue('position') == 'fixed'){divs[i].style.display = 'none'}};");
        this.driver.executeScript("var divs = document.getElementsByTagName('nav');for(let i=0;i<divs.length;i++){if(window.getComputedStyle(divs[i],null).getPropertyValue('position') == 'fixed'){divs[i].style.display = 'none'}};");
        this.driver.executeScript("var divs = document.getElementsByTagName('header');for(let i=0;i<divs.length;i++){if(window.getComputedStyle(divs[i],null).getPropertyValue('position') == 'fixed'){divs[i].style.display = 'none'}};");
    }

}

module.exports = Shoter;