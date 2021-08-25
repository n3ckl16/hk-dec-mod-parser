module.exports = (obj, ans, scope, def) => {
  // if (typeof ans === "string")
  ans = ans.trim()
  const checkNum = /^\d+$/
  if (checkNum.test(ans)) ans = +ans
  if (!ans && ans !== 0) {
    obj[scope] = def
  } else {
    obj[scope] = ans
  }
}
