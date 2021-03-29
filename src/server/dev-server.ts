import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import configFunction from '../../webpack.vue.config'
import { webpack } from 'webpack'

export function clientConfig(development: boolean) {
    const mode = (development) ? 'development' : 'production';

    return configFunction({ rendering: 'ssr', mode: mode });
}

export function serverConfig(development: boolean) {
    const mode = (development) ? 'development' : 'production';
    return configFunction({ rendering: 'ssr', target: 'server', mode: mode });
}

export function devClient() {
    const client = clientConfig(true);
    const clientCompiler = webpack(client);
    return {
        client: {
            devMid: webpackDevMiddleware(clientCompiler,
                {
                    publicPath: (client.output!.publicPath as string),
                    serverSideRender: true
                }),
            devHot: webpackHotMiddleware(clientCompiler)
        }
    }
}