const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
const app = express();
const port = 3000;
const accueilRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const cmd_a_livrerRoutes = require('./routes/cmd_a_livre');
const cmd_livrerRoutes = require('./routes/cmd_livrer');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// configuration connection postGreSQL
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

const pool = new Pool({ connectionString: process.env.SUPABASE_BD_URL});


// Middleware pour servir des fichiers statiques

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Route de base
app.use(accueilRoutes);
app.use(authRoutes);
app.use(cmd_a_livrerRoutes);
app.use(cmd_livrerRoutes);
// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
