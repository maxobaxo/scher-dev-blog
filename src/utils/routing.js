/**
 * Navigate to the hash in the given URL
 * @param {string} hash Id of element to which the page should scroll
 *
 */
export const scrollToHash = hash => {
  const id = hash.substring(1)
  const el = document?.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
