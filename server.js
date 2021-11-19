const https = require('https');
const next = require('next');
const {parse} = require('url');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const httpsOptions = {
    key: fs.readFileSync('./certificates/localhost.key'),
    cert: fs.readFileSync('./certificates/localhost.crt'),
}

app.prepare().then(() => {
    https.createServer(httpsOptions, (req,res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`Custom HTTPS server started on https://localhost:${port}`);
    });
});