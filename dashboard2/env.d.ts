import 'vue-router'
/// <reference types="vite/client" />

declare module 'vue-router' {
  interface RouteMeta {
    action?: string
    subject?: string
    layoutWrapperClasses?: string
    navActiveLink?: RouteLocationRaw
  }
}


interface ImportMetaEnv {
  readonly APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
