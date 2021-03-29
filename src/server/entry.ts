import e, { Request, Response } from 'express'
import { createServer } from 'http'
import { pathExists } from 'fs-extra'
import { join } from 'path'
import process from 'process'

import { serverConfig, devClient, clientConfig } from './dev-server'
import { webpack } from 'webpack'

const isDev = true;
let serverBuild = false;
let clientBuild = isDev;

const expressServer = e();

function ressourceRequest(req: Request, res: Response) {
  const distPath = join(__dirname, "..", "..", "dist-ssr", "dist", req.url);
  
  (async () => {
    try {
      if (await pathExists(distPath)) {
        return res.status(200).sendFile(distPath);
      }
      else
        return res.status(404).end();
    } catch (error) {
      return res.status(500).end();
    }
  })();
}

async function addIfReady() {

  if (!serverBuild || !clientBuild)
    return;

  try {
    expressServer.use('/dist', ressourceRequest);
    expressServer.use(require('../../dist-ssr/server/main').default);
    expressServer.use((req, res) => {
      return res.status(404).end();
    })
    console.log("Building process finished");
  }
  catch (reason) {
    console.log("Build failed: " + reason);
  };
}

expressServer.use(e.json())

if (isDev) {
  const { devMid, devHot } = devClient().client;
  expressServer.use(devMid);
  expressServer.use(devHot);
}
else {
  webpack(clientConfig(false)).run((error, stats) => {
    console.log("Client finished building");
    if (stats?.hasErrors())
      console.log(stats?.compilation.errors)
    clientBuild = true;
    addIfReady();
  })
}

webpack(serverConfig(isDev)).run((error, stats) => {
  console.log("Server finished building");
  if (stats?.hasErrors())
    console.log(stats?.compilation.errors)
  serverBuild = true;
  addIfReady();
});

const server = createServer(expressServer);

function closeServer() {
  console.log("Gracefully shutting down");
  server.close();
  console.log("Goodbye");
}

process.on('SIGINT', () => {
  closeServer()
  process.exit();
});

process.on('SIGTERM', function () {
  closeServer()
  process.exit();
})

server.listen(3000);
console.log("Listening")