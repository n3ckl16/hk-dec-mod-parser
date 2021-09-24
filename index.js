#!/usr/bin/env node
process.env.UV_THREADPOOL_SIZE = 4
process.env.UV_THREADPOOL_SIZE > process.env.NUMBER_OF_PROCESSORS
  ? (process.env.UV_THREADPOOL_SIZE = process.env.NUMBER_OF_PROCESSORS)
  : process.env.UV_THREADPOOL_SIZE

const Parser = require("./js/parser")
const { question } = require("./js/utils")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  removeHistoryDuplicates: true,
})

const init = async () => {
  const config = {}

  config.action = await question(
    rl,
    "Which action you want to execute? | Какое действие вы хотите выполнить?\n parse - all changes go from single .json file to multiple, each one specific for its location | parse - все изменения идут из 1 .json файла в несколько, каждый специфичен для своей локации\n unparse - every single change goes into one .json file | unparse - каждое изменение идет в 1 .json файл",
    "parse"
  )

  config.global = await question(
    rl,
    "Type destination of your global.json! Default is ./global.json\nВведите путь к вашему global.json! По умолчанию: ./global.json",
    "./global.json"
  )

  config.path = await question(
    rl,
    "Type destination of the folder with multiple files! Default is ./DecorationMasterData\nВведите путь к папке с несколькими файлами! По умолчанию: ./DecorationMasterData",
    "./DecorationMasterData"
  )

  config.numOfSpaces = await question(
    rl,
    "How many spaces do you want? Recommended and default: 1!\nСколько пробелов вы хотите? Рекомендуется и по умолчанию: 1!",
    1,
    true
  )

  new Parser(config)
}
init()
