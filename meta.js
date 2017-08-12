const fs = require('fs')
const exiftool = require('node-exiftool')

const ep = new exiftool.ExiftoolProcess()

const extractFieldsFromKeywords = meta => {
    let keywords = []
    if (typeof meta === 'string') {
        keywords.push(meta)
    } else {
        keywords = keywords.concat(meta)
    }
    return fieldsToKeywords(keywords)
}

const fieldsToKeywords = keywords => {
    const fields = {}
    fields.keywords = []
    keywords.forEach(keyword => {
        const k = keyword || ''
        if (!k.match(/\w*:/)) {
            fields.keywords.push(k)
        } else {
            let field = k.split(':')
            fields[field[0]] = field[1].trim()
        }
    })
    return fields
}

ep.open()
    .then(() => ep.readMetadata('./img/thumbs', ['-File:all']))
    .then((metas, err) => {
        const metasClean = []
        metas.data.forEach(meta => {
            const fields = extractFieldsFromKeywords(meta.Keywords)
            fields.fileName = {
                thumbnail: meta.SourceFile,
                img: meta.SourceFile.replace('thumbs/thumb', 'img')
            }
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