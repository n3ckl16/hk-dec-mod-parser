/**
 * A function that allows you to use `promises` and` async / await` instead of `callbacks` when working with a terminal
 * @param {readline.interface} interface Readline interface that you want to use
 * @param {string} text Prompt of your question
 * @param {any} def Default value, if the answer is skipped *(Enter was pressed, without supposedly entered answer )*
 * @param {boolean} last if `true`, then the process stops at the end
 * @returns {Promise}
 */
const question = (interface, text, def, last = false) => {
  return new Promise((res, rej) => {
    interface.question(`\n${text}\n`, ans => {
      res(ansChecker(ans, def))
      last && interface.close()
    })
  })
}
const ansChecker = (ans, def) => {
  // if (typeof ans === "string")
  ans = ans.trim()
  const checkNum = /^\d+$/

  if (checkNum.test(ans)) ans = +ans
  if (!ans && ans !== 0) return (ans = def)
  return ans
}
module.exports = {
  question,
}
