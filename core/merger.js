var mergeImg = require("merge-img");

class ImageMerger {

    constructor(n, path, viewportName) {
        return new Promise((resolve, reject) => {
            var imgs = [];

            for (let i = 0; i < n; i++) {
                imgs.push(`${path}out-${i}.png`);
            }

            mergeImg(imgs, {
                    direction: true
                })
                .then((img) => {
                    // Save image as file
                    img.write(`${path}out-final-${viewportName}.png`, () => {
                        resolve(path)
                    });
                });

        })
    }


}

module.exports = ImageMerger