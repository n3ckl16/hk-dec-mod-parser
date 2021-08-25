#!/usr/bin/env node
process.env.UV_THREADPOOL_SIZE = 4
process.env.UV_THREADPOOL_SIZE > process.env.NUMBER_OF_PROCESSORS
  ? (process.env.UV_THREADPOOL_SIZE = process.env.NUMBER_OF_PROCESSORS)
  : process.env.UV_THREADPOOL_SIZE

const { Parser } = require("./js/parser")
const ansChecker = require("./js/utils")
const readline = require("readline")

const config = {}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  removeHistoryDuplicates: true,
})
rl.question(
  "Which action you want to execute? | Какое действие вы хотите выполнить?\n parse - all changes go from single .json file to multiple, each one specific for its location | parse - все изменения идут из 1 .json файла в несколько, каждый специфичен для своей локации\n unparse - every single change goes into one .json file | unparse - каждое изменение идет в 1 .json файл\n",
  ans => {
    ansChecker(config, ans, "action", "parse")
    rl.question(
      "\nType destination of your global.json! Default is ./global.json\nВведите путь к вашему global.json! По умолчанию: ./global.json\n",
      ans1 => {
        ansChecker(config, ans1, "global", "./global.json")
        rl.question(
          "\nType destination of the folder with multiple files! Default is ./DecorationMasterData\nВведите путь к папке с несколькими файлами! По умолчанию: ./DecorationMasterData\n",
          ans2 => {
            ansChecker(config, ans2, "path", "./DecorationMasterData")
            rl.question(
              "\nHow many spaces do you want? Recommended and default: 1!\nСколько пробелов вы хотите? Рекомендуется и по умолчанию: 1!\n",
              ans3 => {
                ansChecker(config, ans3, "numOfSpaces", 1)
                new Parser(config)
                rl.close()
              }
            )
          }
        )
      }
    )
  }
)
