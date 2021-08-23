const getters = {
  token: state => state.user.token,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  menuList: state => state.user.menuList,
  name: state => state.user.name,
  rememberMe: state => state.user.rememberMe,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  show: state => state.settings.show,
  tableSettings: state => state.settings.tableSettings
}
export default getters
