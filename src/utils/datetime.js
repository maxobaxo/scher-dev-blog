/**
 * Format timestamp
 *
 * @param {string} dateTime
 */
export const formatDate = dateTime => {
  const date = new Date(dateTime)
  return date.toDateString()
}
