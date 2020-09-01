const express = require("express");
const { response } = require(".");
const router = express.Router();
const client = require('./config').pool;
client.connect();

// CREATE ROUTE FUNCTION TO RETRIEVE ALL RECORDS FROM DATABASE TABLE

router.get('/', async (request, response, next) => {
    console.log("ok")
    try{
        const results = await client.query('SELECT * FROM countries ORDER BY id ASC');
        response.status(200).json(results.rows)
    }catch(error){
        if (error) {
            throw error
        }
    }
})

// CREATE ROUTE FUNCTION TO ADD NEW RECORD INTO THE DATABASE

router.post('/', async (request, response, next) => {
    console.log("ok")
        const { name, capital } = request.body
        try{
        await client.query('INSERT INTO countries (name, capital) VALUES ($1, $2)', [name, capital])
        response.status(201).send('A new country has been added to the database')
        }catch(error){
            if (error) {
                throw error
            }
        }
})

// CREATE ROUTE FUNCTION TO UPDATE EXISTING DATABASE RECORDS

router.put('/:id', async (request, response, next) => {
    console.log("ok")
        const id = parseInt(request.params.id)
        const { name, capital } = request.body
        try{
        await client.query('UPDATE countries SET name = $1, capital = $2 WHERE id = $3', [name, capital, id])
        response.status(200).send('Country has been updated in the database')
        }catch(error){
            if (error) {
                throw error
            }
        }
})

// CREATE ROUTE FUNCTION TO DELETE A RECORD FROM THE DATABASE TABLE

router.delete('/:id', async (request, response, next) => {
    console.log("ok")
    const id = parseInt(request.params.id)
    try{
        await client.query('DELETE FROM countries WHERE id = $1', [id])
        response.status(200).send(`Country deleted with ID: ${id}`)
    }catch(error){
        if (error) {
            throw error
        }
    }
})

module.exports = router;