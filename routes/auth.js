const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const memorystore = require("memorystore")(session);
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

const pool = new Pool({ connectionString: process.env.SUPABASE_BD_URL});
router.use(express.urlencoded({ extended: true }));
router.use(express.json());




router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;


  let { data: users, error } = await supabase
  .from('admin')
  .select('*')
  .eq('username', username)
  console.log(users)
if (error) {
        return res.status(500).json({ error: error.message });
    }
    const user = users[0];
    //const match = await bcrypt.compare(password, user.password);
    if (password !== user.password) return res.status(400).send('Mot de passe incorrect'); 
      res.render('index', { user: users[0] })
});



router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Erreur lors de la déconnexion');
    }
    res.redirect('/');
  });
});

module.exports = router;