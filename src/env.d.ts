/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Environment variables.
interface ImportMetaEnv {
  readonly VITE_VGLIST_CLIENT_ID: string
  readonly VITE_VGLIST_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
