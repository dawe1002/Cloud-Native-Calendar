const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

