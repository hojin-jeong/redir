# REDir - iterative REcursive readDIR
[![GitHub](https://img.shields.io/github/license/hojin-jeong/redir)](https://github.com/hojin-jeong/redir/blob/master/license.md)
[![npm](https://img.shields.io/npm/v/redir)](https://www.npmjs.com/package/redir)

> no dependencies, no recursion, tiny, fast and simple

## Installation

    npm install redir

## Usage

```javascript
const REDir = require('redir')

const options = {
    withStat: Boolean,
    fileOnly: Boolean,
    directoryOnly: Boolean
}
const items = REDir('./target-path', options)
console.log(items)
// withStat: false  => [path, path, ...]
// withStat: true   => {path: stat, path: stat, ...}
```