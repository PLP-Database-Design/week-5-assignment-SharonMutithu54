
require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')

const app = express()
app.use(express.json())

// Database configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// Test the database connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('Connected to the database')
})

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients'
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving patients')
    }
    res.json(results)
  })
})

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers'
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers')
    }
    res.json(results)
  })
})

// Question 3: Filter patients by First Name
app.get('/patients/:first_name', (req, res) => {
  const firstName = req.params.first_name
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?'
  db.query(query, [firstName], (err, results) => {
    if (err) {
      return res.status(500).send('Error filtering patients by first name')
    }
    res.json(results)
  })
})

// Question 4: Retrieve all providers by their specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const specialty = req.params.specialty
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?'
  db.query(query, [specialty], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers by specialty')
    }
    res.json(results)
  })
})

// Listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})
