exports.GetHtml = async function (req, res) {
    res.sendFile('index.html', { root: "./src/html" } );
}

exports.GetCss = async function (req, res) {
    res.sendFile('styles.3ff695c00d717f2d2a11.css', { root: "./src/html" } );
}

exports.GetFavicon = async function (req, res) {
    res.sendFile('favicon.ico', { root: "./src/html" } );
}

exports.GetMain1 = async function (req, res) {
    res.sendFile('main-es5.4621dc78558fece5e82a.js', { root: "./src/html" } );
}

exports.GetMain2 = async function (req, res) {
    res.sendFile('main-es2015.4621dc78558fece5e82a.js', { root: "./src/html" } );
}

exports.GetPolyfills1 = async function (req, res) {
    res.sendFile('polyfills-es5.c569d966f6635032fedc.js', { root: "./src/html" } );
}

exports.GetPolyfills2 = async function (req, res) {
    res.sendFile('polyfills-es2015.0e30b7e93628c36a888a.js', { root: "./src/html" } );
}

exports.GetRuntime1 = async function (req, res) {
    res.sendFile('runtime-es5.0dae8cbc97194c7caed4.js', { root: "./src/html" } );
}

exports.GetRuntime2 = async function (req, res) {
    res.sendFile('runtime-es2015.0dae8cbc97194c7caed4.js', { root: "./src/html" } );
}