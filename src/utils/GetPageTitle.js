import defaultSettings from '@/config/settings'

const title = defaultSettings.title || '风控管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
