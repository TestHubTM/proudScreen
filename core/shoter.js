var system = require('system');
var args = system.args;
var appArgs = {};
if (args.length === 1) {
    console.log('Try to pass some arguments when invoking this script!');
} else {

    var pattern = /--(.+?)=((?:[']?|))(.+)\2/;
    var result = [];

    args.forEach(function (arg, i) {

        result = pattern.exec(arg);

        if (result != null) {

            if (result[1] == "url") {
                appArgs.url = result[3];
            } else if (result[1] == "path") {
                appArgs.path = result[3];
            } else if (result[1] == "viewport") {
                appArgs.viewport = JSON.parse(result[3]);
            }
        }

    });
}
console.log(appArgs.url)
var page = require('webpage').create();
page.viewportSize = appArgs.viewport.viewport;
page.open(appArgs.url, function () {
    page.render(appArgs.path + appArgs.viewport.name + '.png');
    phantom.exit();
});