const { writeFile, mkdir, readFile, readdir } = require("fs").promises

class Parser {
  constructor(sets) {
    console.log(sets)
    const { action, global, path, numOfSpaces } = sets
    if (typeof numOfSpaces !== "number")
      return console.error(
        new TypeError("Quantity of spaces is supposed to be a number!")
      )

    this.global = global
    this.path = path
    this.numOfSpaces = numOfSpaces
    this.mod_version
    this.modsCount = 0
    this.locsCount = 0

    try {
      console.time("Done in")
      this[action]()
    } catch (err) {
      if (err) return console.error(err)
    }
  }
  async parse() {
    let data = await readFile(this.global).catch(err => {
      throw console.error(err)
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
        JSON.stringify(output, null, this.numOfSpaces)
      )
    }
    console.log(
      `All ${this.modsCount} modifications to ${this.locsCount} locations had been parsed to different files!`
    )
    console.timeEnd("Done in")
  }
  async unparse() {
    const files = await readdir(this.path).catch(err => {
      throw console.error(err)
    })
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
      JSON.stringify(
        { mod_version: this.mod_version, items },
        null,
        this.numOfSpaces
      )
    )
    console.log(`The global.json file has been created successfully!`)
    console.timeEnd("Done in")
  }
}
module.exports = { Parser }
