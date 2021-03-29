import { Connection } from 'mongoose'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      mode?: 'production' | 'development'
      target?: 'server' | 'client'
      rendering?: 'ssr' | 'csr'
      minimize?: 'false' | 'true'
      babel?: 'false' | 'true'
    }
  }

  var __IS_SSR__: boolean
  var __IS_DEV__: boolean
  var __IS_SERVER__: boolean

}
export { }