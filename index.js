const express = require('express') 
const bodyparser = require('body-parser') 
const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51JQHDaSBkFN0bIJS5VnTiURiNcH0LVYyubJU2SjnMHNbihWS1YlcMKHjuikWCvNWR9bpRSpgSyHzbMgx4jPbKp4j00oGrrNEmJ'
var Secret_Key = 'sk_test_51JQHDaSBkFN0bIJSbR8cz97ldIc1OFN5lC63JjxdacWY1g3E0ktmfyRqnRYfs5f5rJhW3cDCQfzGBl6bGN0BdA8400335ooTAT'

const stripe = require('stripe')(Secret_Key) 

// const port = process.env.PORT || 3000 

app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 

app.get('/', function(req, res){ 
    res.render('main', { 
    key: Publishable_Key 
    }) 
}) 

app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Joy Guha', 
        address: { 
            line1: '963 allahabad uttar pradesh', 
            postal_code: '211001', 
            city: 'uttar pradesh', 
            state: 'uttar pradesh', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 10000,    // Charing Rs 25 
            description: 'Web Development Project', 
            currency: 'INR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Your Payment Successful") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

app.listen(process.env.PORT, function(error){ 
    if(error) throw error 
    console.log("Server created Successfully") 
})