const fs = require('fs')

const folder = '../img'

const readThumbs = (folder, extract) => {
    const metas = []
    fs.readdir(folder, (err, files) => {
        const thumbs = files.filter(file => file.match(/^thumb-/))
        thumbs.map(thumb => extract(metas, { fileName: thumb }))
        fs.writeFile('data.js', JSON.stringify(metas), 'utf8', err => {
            if (err) throw err
            console.log('The file has been saved!')
        })
    })
}

const addMeta = (metas, meta) => metas.push(meta)

readThumbs(folder, addMeta)