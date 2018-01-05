var mergeImg = require("merge-img");

class ImageMerger {

    constructor(n,path) {

        var imgs = [];

        for(let i=0;i<n;i++){
            imgs.push(`out-${i}.png`);
        }

        mergeImg(imgs,{direction:true})
            .then((img) => {
                // Save image as file
                img.write(path+'out-final.png', () => console.log('done'));
            });

    }

}

module.exports = ImageMerger