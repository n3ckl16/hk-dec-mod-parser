# Parser for Hollow Knight's [DecorationMaster](https://github.com/a2659802/HollowKnight.Decoration) Mod
In search of new custom levels, you can still run into old `global.json` files, which contain modifications for all locations combined. This is not the best approach for structuring changes if you want to edit a location separately from everyone else! Thank God now each change goes in a separate file that is specific to each location.

But what about old files? Manually interweave everything into other *json* files... ?! Or do you want, on the contrary, to transfer all changes to *1 global* file?

>In this case, this code will be useful to you!
----------
## Navigation
- [Setup](#setup)
  1. [Action](#action)
  2. [Global](#global)
  3. [Directory](#directory)
  4. [Number of Spaces](#number-of-spaces)
## Setup
Due to my lack of knowing of any other coding languages, everything is written in *JavaScript*, using **[Node JS](https://nodejs.org/)**

The mot efficient way to utilize this code is to install it globally. Go to downloaded folder and run this command in terminal:
```shell
npm link
```
after that, you can use it from every directory by:
```shell
hk-parser
```
>But you need to know that any relative path now depends on your current directory in the terminal

----------
**Otherwise, you have 2 options:**

Go to installed folder and run :
```shell
npm run start
```
...or use the old way
```shell
node index.js
```
### Action
then you will need to *type* ***one*** of two possible actions:
- **parse** - every single change goes into one .json file
- **unparse** - all changes go from single .json file to multiple
### Global
here you need to specify the path to a single file with all the changes (doesn't depend on [Action](#action), can be absolute or relative).

By default `./global.json` (just skip by clicking Enter), it means the directory where executing file resides and *global.json* is the name of the file you need.
### Directory
and the path for output Directory. (doesn't depend on [Action](#action), can be absolute or relative)
By Default `./DecorationMasterData` (just skip by clicking Enter).

the folder name matches the one needed for the **Decoration Mod** just for convenience. You can even directly specify the path to the existing mod folder in the game directory.

Tip:
```directory
Hollow Knight/hollow_knight_Data/Managed/Mods/DecorationMasterData
```
### Number of Spaces
It's supposed to be a `number`. (doesn't depend on [Action](#action)) By Default is **`1`** (just skip by clicking Enter).

----------
>so, here is your file management!
