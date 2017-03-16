const express = require('express');
const app = express();
const path = require("path");
const datastore = require('@google-cloud/datastore');
const datastoreClient = datastore({
    projectId: 'dauntless-karma-161716',
    keyFilename: '/path/to/keyfile.json'
});
const contentBlocks = require('contentblocks')({
    app: app,
    host: 'localhost',
    port: 8080,
    pathFind: '/v1/api/find?q={"@subject":"[id]"}',
    pathPost: '/v1/api',
    pathPut: '/v1/api/[id]',
    pathDelete: '/v1/api/[id]'
});

var blogPostKey = datastoreClient.key('BlogPost');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.post('/cms', (req, res) => {
    datastoreClient.save({
        key: blogPostKey,
        data: {
            name: 'test',
            timestamp: new Date()
        }
    }, function(err) {
        console.log('done', err);
    });
});

app.use(express.static('src/static'))
app.use(contentBlocks.render);

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Example app listening at http://${host}:${port}`);
});