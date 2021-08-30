export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 18
    ? '下午好'
    : '晚上好'
}

export function indexMethod(offset, limit, index) {
  return 'No:' + (index + 1 + (offset - 1) * limit)
}
