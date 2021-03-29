import { renderToString } from '@vue/server-renderer'
import { createDefaultApp } from '../shared/app'
import { NextFunction, Request, Response } from 'express'
import { Stats, Compiler } from 'webpack'
import { JSDOM } from 'jsdom'
import path from 'path'

function loadDevMiddleWare(res: Response) {
    interface devMiddleware {
        stats: Stats,
        outputFileSystem: Compiler['outputFileSystem']
    };

    return (__IS_DEV__) ? <devMiddleware>res.locals.webpack.devMiddleware : undefined;
}

export default async function ssr(req: Request, res: Response, next: NextFunction) {

    if (!req.accepts('html'))
        return next();

    try {
        const devMiddleware = loadDevMiddleWare(res);

        const outputFileSystem = devMiddleware?.outputFileSystem;
        const jsonWebpackStats = devMiddleware?.stats.toJson();
        const { assetsByChunkName, outputPath } = jsonWebpackStats || {};

        const { router, app } = createDefaultApp()

        router.push(req.url);
        await router.isReady();


        const currentRoute = router.currentRoute.value;
        if (!currentRoute.matched.length) return res.status(404).end();

        res.contentType('html');
        res.charset = 'utf-8';

        const dom = (!__IS_DEV__)
            ? await JSDOM.fromFile('./dist-ssr/dist/test.html')
            : new JSDOM(await new Promise<string>((resolve, reject) => {
                outputFileSystem!.readFile(path.join(outputPath!, 'test.html'), (error, result) => {
                    if (error)
                        reject(error);
                    resolve(result! as string);
                })
            }));

        const doc = dom.window.document;
        const head = doc.head;
        doc.children[0].setAttribute('lang', 'en');
        head.innerHTML += `<title>Hello World</title>`;

        head.innerHTML += `
        <meta charset="utf-8">
        <meta name="viewport" content=width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">`
        head.innerHTML += `<link rel="preload" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" as="style">`
        head.innerHTML += `<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">`

        doc.getElementById('app')!.innerHTML = await renderToString(app, {});

        res.send(dom.serialize());
    } catch (error) {
        console.log(error);
        return res.status(500).end("Internal Server Error");
    }
}