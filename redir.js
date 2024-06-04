
const { existsSync, lstatSync, readdirSync } = require('fs')
const { isAbsolute, join, normalize, sep } = require('path')
const parentModule = Object.values(require.cache).find(m => m.children.filter(child => !!child).includes(module))

function pathNormalize(path) {
    let p = normalize(path)
    if(!isAbsolute(p)) p = '.' + sep + p
    return p
}
function getAbsolutePath(path) {
    return isAbsolute(path) ? path : join(parentModule.path, path)
}
function isExists(path) {
    return existsSync(getAbsolutePath(path))
}
function getStat(path) {
    return lstatSync(getAbsolutePath(path))
}
function readDir(path) {
    return readdirSync(getAbsolutePath(path))
}

function REDir(path, opts = {}) {
    path = pathNormalize(path)
    if(!isExists(path) || !getStat(path).isDirectory()) return []
    const queue = [path]
    const result = opts.withStat ? {} : []
    while (queue.length) {
        const currentPath = queue.shift()
        const stat = getStat(currentPath)
        const isDir = stat.isDirectory()
        if (isDir) queue.unshift(...readDir(currentPath).map(p => [currentPath, p].join(sep)))
        if (path !== currentPath) {
            if((!opts.fileOnly && opts.directoryOnly && !isDir)
                || (opts.fileOnly && !opts.directoryOnly && isDir)) continue
            if(opts.withStat)
                result[currentPath] = stat
            else
                result.push(currentPath)
        }
    }
    return result
}

module.exports = REDir
module.exports.default = REDir