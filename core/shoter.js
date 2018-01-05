var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


class Shoter {
    constructor(viewport, url, path) {

        var driver = new webdriver.Builder().withCapabilities({
            'browserName': 'firefox',
            acceptSslCerts: true,
            acceptInsecureCerts: true
        }).build();
        driver.manage().window().setSize(viewport.viewport.width, viewport.viewport.height);

        driver.get(url).then(function () {

            driver.executeScript("return document.getElementsByTagName('body')[0].scrollHeight").then((height) => {

                driver.executeScript("window.scrollTo(0,document.body.scrollHeight)");

                var viewPortHeight = viewport.viewport.height;
                var times = parseInt(height / viewPortHeight);
                for (let i = 0; i < times; i++) {
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

                var remaining = height - (times * viewPortHeight);

                driver.manage().window().setSize(viewport.viewport.width, remaining);

                driver.executeScript("window.scrollTo(0," + height + ")");
                driver.sleep(1500).then(function () {
                    driver.takeScreenshot(true).then(
                        function (image, err) {
                            require('fs').writeFileSync(`${path}out-${times}.png`, image, 'base64', function (err) {
                                console.log(err);
                            });


                            var Merger = require("./merger");

                            new Merger(times + 1,path);

                        }



                    );
                })




            })

        });




    }
}

module.exports = Shoter;