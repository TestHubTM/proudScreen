const Shoter = require("./shoter");

class ScreenShot {

    constructor(url, path) {

        this.url = url;

        this.path = path;

        this.viewports = [{
                'name': 'smartphone-portrait',
                'viewport': {
                    width: 320,
                    height: 480
                }
            },
            {
                'name': 'smartphone-landscape',
                'viewport': {
                    width: 480,
                    height: 320
                }
            },
            {
                'name': 'tablet-portrait',
                'viewport': {
                    width: 768,
                    height: 1024
                }
            },
            {
                'name': 'tablet-landscape',
                'viewport': {
                    width: 1024,
                    height: 768
                }
            },
            {
                'name': 'desktop-standard',
                'viewport': {
                    width: 1280,
                    height: 1024
                }
            }
        ];

        for (let viewport of this.viewports) {

            this.takeScreenShot(viewport);

        }


    }

    takeScreenShot(viewport) {

        new Shoter(viewport,this.url,this.path);
        
    }


}


module.exports = ScreenShot;