# Parser for Hollow Knight's [DecorationMaster](https://github.com/a2659802/HollowKnight.Decoration) Mod
In search of new custom levels, you can still run into old `global.json` files, which contain modifications for all locations combined. This is not the best approach for structuring changes if you want to edit a location separately from everyone else! Thank God now each change goes in a separate file that is specific to each location.

But what about old files? Manually interweave everything into other *json* files... ?! Or do you want, on the contrary, to transfer all changes to *1 global* file?

In this case, this code will be useful to you!

## Navigation
* [Setup](#setup)
  * [Action](#action)
  * [Global](#global)
  * [Directory](#directory)
## Setup
Due to my lack of knowing of any other coding languages, everything is written in *JavaScript*, using **[Node JS](https://nodejs.org/)**

#### Simply run this command in terminal
```
npm run start
```
#### ...or use the old way
```
node parser.js
```
### Action
then you will need to *type* ***one*** of two possible actions:
 - **parse** - every single change goes into one .json file
 - **unparse** - all changes go from single .json file to multiple
### Global
here you need to specify the path to a single file with all the changes (doesn't depend on [Action](#action), can be absolute or relative).

By default `./global.json` (just skip by clicking Enter), it means the directory where excuting file resides and *global.json* is the name of the file you need.
### Directory
and the path for output Directory. (doesn't depend on [Action](#action), can be absolute or relative)
By default `./DecorationMasterData` (just skip by clicking Enter).

the folder name matches the one needed for the **Decoration Mod** just for convenience. You can even directly specify the path to the existing mod folder in the game directory.

Tip:
```
Hollow Knight\hollow_knight_Data\Managed\Mods\DecorationMasterData
```
###
so, here is your file management!
