const Shoter = require("./shoter");
const fs = require("fs");
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

        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }

        for (let viewport of this.viewports) {

            let tempPath = "";
            
            tempPath += path +"/" + viewport.name + "/";

            if (!fs.existsSync(tempPath)) {
                fs.mkdirSync(tempPath)
            }

            this.takeScreenShot(viewport,tempPath);

            fs.writeFileSync(tempPath+"readme.txt",`#proudScreen: width:${viewport.viewport.width}px\n height:${viewport.viewport.height}px, name:${viewport.name}, site:${this.url} #endOfFile;)`)

        }
        


    }

    takeScreenShot(viewport,path) {

        new Shoter(viewport, this.url, path);

    }


}


module.exports = ScreenShot;