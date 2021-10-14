
const Fs = require('fs')
const Path = require('path')

module.exports = function REDir(p, opts = {}) {
    if (!Fs.existsSync(p) || !Fs.lstatSync(p).isDirectory()) return []
    p = Path.isAbsolute(p) ? Path.normalize(p) : `.${Path.sep}${Path.normalize(p)}`
    const tl = [p]
    const r = opts.withStat ? {} : []
    while (tl.length) {
        const tp = tl.shift()
        const s = Fs.lstatSync(tp)
        if (s.isDirectory()) tl.unshift(...Fs.readdirSync(tp).map(i => [tp, i].join(Path.sep)))
        if (p !== tp) {
            if((!opts.fileOnly && opts.directoryOnly && !s.isDirectory())
                || (opts.fileOnly && !opts.directoryOnly && s.isDirectory())) continue
            if(opts.withStat) {
                r[tp] = s
            } else {
                r.push(tp)
            }
        }
    }
    return r
}