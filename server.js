const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); //built in from node

if (process.env.NODE_ENV !== 'production') require('dotenv').config();  //only load .env when we are not in production //because we're not gonna share our .env file with anyone
//if we deploy it to heroku we need to create this environmental variable on heroku app of course
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);// we can do this because of dotenv it finds automatically .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json()); //when requests sends with body we want to convert the json data into objects
app.use(bodyParser.urlencoded({extended: true})); //encoding url parameters

app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build'))); // in production, we are pointing express our static frontend files so that it can load
    //this will automatically run by heroku ,so, we need to remove buildpacks of our existing project that we installed on heroku
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html')); //for every url requested we want to point them to index.html which is where our React app is
    })
}

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({error: stripeErr})
        }else {
            res.status(200).send({ success: stripeRes })
        }
    })
});

app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Server is listening to ${port}`)
});