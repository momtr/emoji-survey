const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

/** used for google firebase */
const adminSDK = require('./libs/GoogleFirebase/database.js');
const db = new adminSDK.FirebaseRealTime();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/emojis', (req, res) => {
    let emojis = req.query.e;
    if(!emojis) {
        sendErrorMessage(res, 10001, 'No emojis specified!');
        return;
    }
    /** insert into DB */
    db.insertData('emojis', Date.now(), { emojis });
    /** render response file */
    res.send(JSON.stringify({
        status: 'success',
        message: 'saved emojis',
        recommendedRedirect: '/finished'
    }))
    console.log('emojis: ' + emojis);
});

app.get('/finished', (req, res) => {
    res.sendFile(__dirname + '/public/thankYou.html');
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/pageNotFound.html');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
});


function sendErrorMessage(res, code, text, el) {
    res.send({
        status: 'ERROR',
        code: code,
        text: text,
        data: {
            el: el
        }
    })
}