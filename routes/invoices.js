const express = require('express')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()

const invoices= [
    {
        id: uuidv4(),
        userId: 1,
        productId: 1,
        totalPrice: '999 €',
        date: '2022-02-02'
    },
    {
        id: uuidv4(),
        userId: 2,
        productId: 1,
        totalPrice: '20 €',
        date: '2021-02-02'
    },
    {
        id: uuidv4(),
        userId: 1,
        productId: 1,
        totalPrice: '999 €',
        date: '2022-02-02'
    },
];

router.get('/', (req, res) => {
    res.json(invoices);      
})
/*
router.get('/:invoiceId', (req, res) => {
   
    // '==' jos käytetään suoraan numeroituja, '===' jos uuid:llä generoituja
    let foundIndex = invoices.findIndex(t => t.id == req.params.invoiceId);

    if(foundIndex === -1){
        res.sendStatus(404);
    } else {
        res.json(invoices[foundIndex]);
    }
})*/

//Yhden käyttäjän yksi invoice
router.get('/:userId/:invoiceId', (req, res) => {
    let invoise = invoices.find(t => t.userId == req.params.userId && t.id == req.params.invoiceId);
    if (invoise)
        res.json(invoise);
        
    else
        res.sendStatus(404);
}); 

//Kaikki invoiset tietyltä käyttäjältä
router.get('/:userId/', (req, res) => {
    let invoise2 = invoices.filter(t => t.userId == req.params.userId);
    if (invoise2)
        res.json(invoise2);
    else
        res.sendStatus(404);
    
}); 

//Purchase
router.post('/', (req, res) =>{
    console.log(req.body);

    invoices.push({
        id: uuidv4(),
        userId: req.body.userId,
        productId: req.body.productId,
        totalPrice: req.body.totalPrice,
        date: req.body.date
    });

    res.sendStatus(201);
});

//delete invoice of user
router.delete('/:invoiceId', (req, res) =>{


    // '==' jos käytetään suoraan numeroituja, '===' jos uuid:llä generoituja
    let foundIndex = invoices.findIndex(t => t.id == req.params.invoiceId);

    if(foundIndex === -1){
        res.sendStatus(404);
    } else {
        invoices.splice(foundIndex, 1);
        res.sendStatus(202);
    }
})


module.exports = router