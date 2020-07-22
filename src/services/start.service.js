// routes/start.service.js

function GetHtml(req, res){
    res.sendFile('index.html', { root: "./src/html" } );
}

function GetCss(req, res){
    res.sendFile('styles.3ff695c00d717f2d2a11.css', { root: "./src/html" } );
}

function GetFavicon(req, res){
    res.sendFile('favicon.ico', { root: "./src/html" } );
}

function GetMain1(req, res){
    res.sendFile('main-es5.78c2944075552d9f1a0e.js', { root: "./src/html" } );
}

function GetMain2(req, res){
    res.sendFile('main-es2015.78c2944075552d9f1a0e.js', { root: "./src/html" } );
}

function GetPolyfills1(req, res){
    res.sendFile('polyfills-es5.c569d966f6635032fedc.js', { root: "./src/html" } );
}

function GetPolyfills2(req, res){
    res.sendFile('polyfills-es2015.0e30b7e93628c36a888a.js', { root: "./src/html" } );
}

function GetRuntime1(req, res){
    res.sendFile('runtime-es5.0dae8cbc97194c7caed4.js', { root: "./src/html" } );
}

function GetRuntime2(req, res){
    res.sendFile('runtime-es2015.0dae8cbc97194c7caed4.js', { root: "./src/html" } );
}


module.exports ={
    GetHtml:GetHtml,
    GetCss:GetCss,
    GetFavicon:GetFavicon,
    GetMain1:GetMain1,
    GetMain2:GetMain2,
    GetPolyfills1:GetPolyfills1,
    GetPolyfills2:GetPolyfills2,
    GetRuntime1:GetRuntime1,
    GetRuntime2:GetRuntime2
};