const fs = require('fs')
const exiftool = require('node-exiftool')

const ep = new exiftool.ExiftoolProcess()
ep.open()
    // read directory
    .then(() => ep.readMetadata('../img-en-attente', ['-File:all']))
    .then((metas, err) => {
        const metasClean = []
        metas.data.forEach(meta => {
            metasClean.push({
                dateCreated: meta.dateCreated || new Date('01/01/2010'),
                location: meta['Caption-Abstract'] || '',
                keywords: meta.keywords || [],
                model: meta.Model || []
            })
        })
        fs.writeFile('../data.json', JSON.stringify(metasClean), 'utf8', err => {
            if (err) throw err
            console.log('The file has been saved!')
        })
    })
    .then(() => ep.close())
    .catch(console.error)