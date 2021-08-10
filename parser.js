#!/usr/bin/env node
process.env.UV_THREADPOOL_SIZE = 4
process.env.UV_THREADPOOL_SIZE > process.env.NUMBER_OF_PROCESSORS
  ? (process.env.UV_THREADPOOL_SIZE = process.env.NUMBER_OF_PROCESSORS)
  : process.env.UV_THREADPOOL_SIZE
const { writeFile, mkdir, readFile, readdir } = require("fs").promises
const readline = require("readline")

const config = {}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  removeHistoryDuplicates: true,
})
rl.question(
  "Which action you want to execute?\n parse - every single change goes into one .json file\n unparse - all changes go from single .json file to multiple\n",
  ans => {
    ans = ans.trim()
    if (ans === "" || ans === undefined || ans === null) {
      config.action = "parse"
    } else {
      config.action = ans
    }

    rl.question(
      "Type destination of your global.json! Default is ./global.json\n",
      ans1 => {
        ans1 = ans1.trim()
        if (ans1 === "" || ans1 === undefined || ans1 === null) {
          config.global = "./global.json"
        } else {
          config.global = ans1
        }
        rl.question(
          "Type destination of the folder with multiple files! Default is ./DecorationMasterData\n",
          ans2 => {
            ans2 = ans2.trim()
            if (ans1 === "" || ans1 === undefined || ans1 === null) {
              config.path = "./DecorationMasterData"
            } else {
              config.path = ans2
            }
            new Parser(config)
            rl.close()
          }
        )
      }
    )
  }
)
class Parser {
  constructor(sets) {
    console.log(sets)
    this.global = sets.global
    this.path = sets.path
    this.mod_version = 0
    this.modsCount = 0
    this.locsCount = 0
    this[sets.action]()
  }
  async parse() {
    try {
      console.time("Done in")
      let data = await readFile(this.global).catch(err => {
        throw err
      })
      data = JSON.parse(data)
      this.mod_version = data["mod_version"]
      const locs = [
        ...new Set(
          data.items.map(mod => {
            return mod.sceneName
          })
        ),
      ]
      this.locsCount = locs.length
      await mkdir(this.path).catch(err => {
        if (err.code !== `EEXIST`) throw err
      })
      for (let i = 0; i < locs.length; i++) {
        let changes = await data.items.filter(mod => {
          if (mod.sceneName === locs[i]) {
            this.modsCount++
            return mod
          }
        })
        const output = { mod_version: this.mod_version, items: changes }
        writeFile(
          `${this.path}/${locs[i]}.json`,
          JSON.stringify(output, null, 1)
        )
      }
      console.log(
        `All ${this.modsCount} modifications to ${this.locsCount} locations had been parsed to different files!`
      )
      console.timeEnd("Done in")
    } catch (err) {
      if (err) throw err
    }
  }
  async unparse() {
    try {
      console.time("Done in")
      const files = await readdir(this.path)
      let items = []
      for (let i = 0; i < files.length; i++) {
        if (files[i] === `global.json`) i++
        let data = await readFile(`${this.path}/${files[i]}`)
        data = JSON.parse(data)
        this.mod_version = data["mod_version"]
        data.items.forEach(mod => {
          items.push(mod)
        })
      }
      writeFile(
        this.global,
        JSON.stringify({ mod_version: this.mod_version, items }, null, 1)
      )
      console.log(`The global.json file has been created successfully!`)
      console.timeEnd("Done in")
    } catch (err) {
      if (err) throw err
    }
  }
}
