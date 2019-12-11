const express = require('express')

const path = require('path');

const root = path.join(__dirname, './view');

const {exec} = require("child_process")

var proxyMiddleWare = require("http-proxy-middleware");

const app = express();

const { HOST = 'https://fyxftest.xymmp.com/', PORT = '8899' } = {}

var proxyOption ={target:HOST,changeOrigin:true}
console.log(proxyOption)
app.set('port', PORT);

app.use('/', express.static(root))

app.use("/fuyang-api",proxyMiddleWare(proxyOption))

app.listen(app.get('port'), () => {
    let url = `http://localhost:${app.get('port')}`
    switch (process.platform) {
        case "darwin":
            exec(`open ${url}`);
        case "win32":
            exec(`start ${url}`);
        default:
            exec(`open ${url}`);
    }
})