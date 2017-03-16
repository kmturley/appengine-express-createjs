const express = require('express');
const app = express();
const path    = require("path");
const contentBlocks = require('contentblocks')({
    app: app,
    host: 'dauntless-karma-161716.appspot.com',
    port: 80,
    pathFind: '/v1/nest/find?q={"@subject":"[id]"}',
    pathPost: '/v1/nest',
    pathPut: '/v1/nest/[id]',
    pathDelete: '/v1/nest/[id]'
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.use(express.static('src/static'))
app.use(contentBlocks.render);

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Example app listening at http://${host}:${port}`);
});