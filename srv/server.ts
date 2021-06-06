const cds = require('@sap/cds');
const cors = require('cors');

module.exports = async (options) => {

    const express = require('express');
    const app = cds.app = options.app || express();
    const PORT = options.port || process.env.PORT || 3000;
    cds.emit('bootstrap', app); // hook for project-local server.js

    app.use(cors());

    app.use(express.static(cds.env.folders.app)); //> defaults to ./app
    // app.get('/', (_, res) => res.send(index.html)); //> if none in ./app
    // app.use('/favicon.ico', express.static(__dirname + '/etc/favicon.ico', { maxAge: '14d' }));
    app.use(options.logger || logger); //> basic request logging

    // load specified models or all in project
    const model = cds.model = await cds.load(options.from);

    // bootstrap --in-memory db if requested
    if (options.in_memory) {
        cds.db = await cds.deploy(model, options);
    } else if (cds.requires.db) {
        // connect to primary database if required
        cds.db = await cds.connect.to('db');
    }
    // construct and mount modelled services

    const services = await cds.serve(options).from(model).in(app);
    cds.emit('served', services);

    // start http server
    return app.listen(PORT);

};

// -------------------------------------------------------------------------
// helpers...
// const { index } = require('./server/index_html');

const DEBUG = cds.debug('server');
const logger = (req, _, next) => { /* eslint-disable no-console */
    console.log(req.method, decodeURI(req.url));
    if (req.status > 300) {
        console.log();
    }
    if (/\$batch/.test(req.url)) {
        // eslint-disable-next-line no-shadow
        req.on('dispatch', (req) => {
            console.log('>', req.event, req._.path, req._.query);
            if (DEBUG && req.query) console.debug(req.query);
        });
    }
    next();
};

// -------------------------------------------------------------------------
if (!module.parent) module.exports(process.argv[2]);
