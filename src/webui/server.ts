// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {enableProdMode} from '@angular/core';

import * as express from 'express';
import {join} from 'path';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
// Using axios https://www.npmjs.com/package/axios
import axios from 'axios';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 9000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const SERVER_BASE_URL = 'http://localhost:4000';
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');


app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('/api/*', (req, res) => {
  // Redirect all request to java server.
  axios({
    baseURL: SERVER_BASE_URL,
    method: req.method,
    url: req.originalUrl,
    timeout: 20000 // 20 secs
  }).then(response => {
    res.status(response.status).send(response.data);
  }).catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(`ERROR: ${error.message}`);
      console.log(`Response Data: ${error.response.data}`);
      console.log(`Response Status: ${error.response.status}`);
      console.log(`Response Headers: ${error.response.headers}`);

      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(`ERROR: ${error.message}`);
      console.log(`Can not make request to: ${SERVER_BASE_URL}`);

      res.sendStatus(404);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(`ERROR: ${error.message}`);

      res.sendStatus(500);
    }
  });
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), {req});
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
