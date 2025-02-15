
import { setLocale, i18n } from '@element-plus/locale'
import { setConfig } from '@element-plus/utils/config'
import isServer from '@element-plus/utils/isServer'
// if you encountered problems alike "Can't resolve './version'"
// please run `yarn bootstrap` first
import * as components from './components'
import * as plugins from './plugins'
import { version as version_ } from './version'
import dayjs from 'dayjs'

import type { App } from 'vue'
import type { InstallOptions } from '@element-plus/utils/config'

export * from './components'
export * from './plugins'

type DWindow = Window & typeof globalThis & {
  dayjs?: typeof dayjs
}

// expose Day.js to window to make full bundle i18n work
if (!isServer) {
  const _window: DWindow = window

  if (!_window.dayjs) {
    _window.dayjs = dayjs
  }
}

const version = version_ // version_ to fix tsc issue

const defaultInstallOpt: InstallOptions = {
  size: '' as ComponentSize,
  zIndex: 2000,
}

const install = (app: App, opt: InstallOptions): void => {
  const option = Object.assign(defaultInstallOpt, opt)
  // currently this is not reactive, we need to update this function
  // to make it reactive.
  setLocale(option.locale)
  if (option.i18n) {
    i18n(option.i18n)
  }
  app.config.globalProperties.$ELEMENT = option
  setConfig(option)

  Object.keys(components).forEach(c => {
    app.use(components[c])
  })

  Object.keys(plugins).forEach(plugin => {
    app.use(plugins[plugin])
  })
}

export { version }

export default {
  version,
  install,
}
