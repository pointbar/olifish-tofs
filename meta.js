const fs = require('fs')
const exiftool = require('node-exiftool')

const ep = new exiftool.ExiftoolProcess()

const extractFieldsFromKeywords = meta => {
    const fields = {}
    let keywords = []
    if (typeof meta === 'string') {
        keywords = [meta]
    } else {
        keywords = meta || []
    }
    fields.keywords = []
    keywords.forEach(keyword => {
        if (!keyword.match(/\w*:/)) {
            fields.keywords.push(keyword)
        } else {
            let field = keyword.split(':')
            fields[field[0]] = field[1].trim()
        }
    })
    return fields
}

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


ep.open()
    .then(() => {
        console.log('yop')
        return ep.readMetadata('./img-en-attente', ['-File:all'])
    })
    .then((metas, err) => {
        const metasClean = []
        metas.data.forEach(meta => {
            const fields = extractFieldsFromKeywords(meta.Keywords)
            fields.thumbnail = meta.SourceFile
            fields.img = meta.SourceFile.replace('thumb', 'img')
            fields.dateCreated = meta.dateCreated || new Date('01/01/2010')
            fields.location = meta['Caption-Abstract'] || ''
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