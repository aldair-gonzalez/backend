export const requireApiSession = (req, res, next) => {
  if (!req.cookies.jwt) {
    req.session = null
    return res.redirect('/error')
  }
  return next()
}

export const requireViewSession = (req, res, next) => {
  if (!req.cookies.jwt) {
    req.session = null
    return res.redirect('/signin')
  }
  return next()
}
