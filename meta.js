(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;

    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

const fs = require('fs')
const exiftool = require('node-exiftool')

const ep = new exiftool.ExiftoolProcess()

const extractFieldsFromKeywords = (keywords) => {
    const fields = {}
    fields.keyword = []
    keywords.forEach(keyword => {
        if (!keyword.match(/\w*:/)) {
            fields.keyword.push(keyword)
        } else {
            let field = keyword.split(':')
            fields[field[0]] = decodeURIComponent(escape(field[1].trim()))
        }
    })
    return fields
}

ep.open()
    .then(() => ep.readMetadata('./img-en-attente', ['-File:all']))
    .then((metas, err) => {
        console.log('metas', metas)
        const metasClean = []
        metas.data.forEach(meta => {
            console.log(meta)
            const fields = {}
            fields.dateCreated = meta.dateCreated || new Date('01/01/2010')
            fields.location = meta['Caption-Abstract'] || ''
            fields.keywords = meta.keywords || []
            fields.model = meta.Model || []
            metasClean.push(fields)
        })
        fs.writeFile('data.json', JSON.stringify(metasClean), 'utf8', err => {
            if (err) throw err
            console.log('The file has been saved!')
        })
    })
    .then(() => ep.close())
    .catch(console.error)