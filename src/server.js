import fs from 'fs';
import https from 'https';
import app from './app';

if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('../../key.pem', 'utf8');
  const certificate = fs.readFileSync('../../cert.pem', 'utf8');

  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(3333);
} else {
  app.listen(3333);
}

// Docker Compose
/* if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('cert/privkey1.pem', 'utf8');
  const certificate = fs.readFileSync('cert/fullchain1.pem', 'utf8');

  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(3335);
} else {
  app.listen(3333);
} */
