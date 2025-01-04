const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// JSON parse
let sonnets = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'sonnets.json'), 'utf8'));

// static middleware
app.use(express.static(path.join(__dirname, 'public')));

// random sonnet 
function getRandomSonne() {
    const randomIndex = Math.floor(Math.random() * sonnets.length);
    const randomSonnet = sonnets[randomIndex];
    const randomLine = Math.floor(Math.random() * randomSonnet.lines.length);
    return {
        line: randomSonnet.lines[randomLine],
        title: randomSonnet.title,
        sonne: randomSonnet.lines
    };
}


function searchInSonnets(query) {
    const results = [];
    sonnets.forEach(sonnet => {
        if (sonnet.title.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                title: sonnet.title,
                line: 'Title match found',
                sonnetLineIndex: -1,  
                sonne: sonnet.lines
            });
        }

        sonnet.lines.forEach((line, index) => {
            if (line.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    title: sonnet.title,
                    line: line,
                    sonnetLineIndex: index,
                    sonnetTitle: sonnet.title,
                    sonne: sonnet.lines
                });
            }
        });
    });
    return results;
}

//endpoint random sonnet
app.get('/apisude', (req, res) => {
    const randomSonne = getRandomSonne();
    res.send({ line: randomSonne.line, title: randomSonne.title, sonne: randomSonne.sonne });
});

// endpoint search
app.get('/search', (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).send({ error: 'Query parameter is required' });
    }
    const searchResults = searchInSonnets(query);
    res.send({ query, results: searchResults });
});

// seerve html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app; // vercel
