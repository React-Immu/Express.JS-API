const express = require('express')
const { v4: uuidv4 } = require('uuid');
const router = express.Router()

const users= [
    { 
        id: uuidv4(),
        name: 'Sami',
        address: 'katu 1'
    },
    { 
        id: uuidv4(),
        name: 'Testi kaali',
        address: 'kaalikatu 1'
    }
];

router.get('/', (req, res) => {
    res.json(users);      
})

router.post('/', (req, res) =>{
    console.log(req.body);

    users.push({
        id: uuidv4(),
        name: req.body.name,
        address: req.body.address
    });

    res.sendStatus(201);
});

module.exports = router