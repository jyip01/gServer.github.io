const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('common'))

const googleApps = require('./google-data.js')

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query

    let results = googleApps

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort options are rating or app.  Please modify your query.')
        }
    }

    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            res
                .status(400)
                .send('Genre options are Action, Puzzle, Strategy, Casual, Arcade, or Card. Please modify your query.')
        } else {
            results = googleApps
                .filter(googleApp => 
                    googleApp
                        .Genres
                        .includes(genres)
                )
        }
    }

    results.sort(
        (a, b) => 
            a.Rating > b.Rating ? 1 
                : a.Rating < b.Rating ? -1 
                : 0
    )

    res.json(results)
})

module.exports = app