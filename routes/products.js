const express = require('express')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()

const products= [
    { 
        id: uuidv4(),
        name: 'makkara',
        manufacturer: 'Samsung',
        category: 'Food-product',
        description: 'ads',
        price: '10 €'
    },
    { 
        id: uuidv4(),
        name: 'porkkana',
        manufacturer: 'Nokia',
        category: 'Food-product',
        description: 'qwerty',
        price: '19 €'
    },
    { 
        id: uuidv4(),
        name: 'puhelin',
        manufacturer: 'Nokia',
        category: 'electronic',
        description: 'as',
        price: '1541 €'
    },
    { 
        id: uuidv4(),
        name: 'akku',
        manufacturer: 'akkutehas',
        category: 'electronic',
        description: 'as',
        price: '1541 €'
    }

];


router.get('/', (req, res) => {
    res.json(products);      
})

router.get('/:productId', (req, res) => {
   
    let foundIndex = -1;
    for(let i = 0; i <products.length; i++){
        if(products[i].id == req.params.productId){
            foundIndex = i;
            break;
        }
    }

    if(foundIndex === -1){
        res.sendStatus(404);
    } else {
        res.json(products[foundIndex]);
    }
})

//Haku nimen, manufacturerin ja kategorian perusteella
router.get('/:productName/:productManuf/:productCateg', (req, res) => {

    let prodByNameManufCateg = products.filter(t => t.name === req.params.productName || t.manufacturer === req.params.productManuf || t.category === req.params.productCateg);

    if(prodByNameManufCateg){
        res.json(prodByNameManufCateg)
    }else{
        res.sendStatus(404);
        return;
    }
})

router.delete('/:productId', (req, res) =>{


    // '==' jos käytetään suoraan numeroituja, '===' jos uuid:llä generoituja
    let foundIndex = products.findIndex(t => t.id == req.params.productId);

    if(foundIndex === -1){
        res.sendStatus(404);
    } else {
        products.splice(foundIndex, 1);
        res.sendStatus(202);
    }
})

router.post('/', (req, res) =>{
    console.log(req.body);

    products.push({
        id: uuidv4(),
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price
    });

    res.sendStatus(201);
});

router.put('/:productId', (req, res) =>{
    // '==' jos käytetään suoraan numeroituja, '===' jos uuid:llä generoituja
    let foundProduct = products.find(t => t.id == req.params.productId);
    if(foundProduct) {
        foundProduct.name = req.body.name;
        foundProduct.manufacturer = req.body.manufacturer;
        foundProduct.category = req.body.category;
        foundProduct.description= req.body.description;
        foundProduct.price= req.body.price;
        res.sendStatus(202);
    }else {
        res.sendStatus(404);
    }

})

module.exports = router