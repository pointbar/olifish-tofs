const fs = require('fs')
const exiftool = require('node-exiftool')

const ep = new exiftool.ExiftoolProcess()
ep.open()
    // read directory
    .then(() => ep.readMetadata('img-en-attente', ['-File:all']))
    .then((metas, err) => {
        const metasClean = []
        metas.data.forEach(meta => {
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