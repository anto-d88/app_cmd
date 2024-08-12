const express = require('express');
const path = require('path');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

const pool = new Pool({ connectionString: process.env.SUPABASE_BD_URL});
router.use(express.urlencoded({ extended: true }));
router.use(express.json());



const authenticate = (req, res, next) => {
  if (!req.query.userId) {
    return res.redirect('/login');
  }
  next();
};


router.get('/cmd_a_livrer', authenticate, async (req, res) => {

  let { data: pending_deliveries, error } = await supabase
  .from('pending_deliveries')
  .select('*')
  
  
if (error) {
        return res.status(500).json({ error: error.message });
    }
    console.log(pending_deliveries[0])
    console.log(pending_deliveries)
   
    //const match = await bcrypt.compare(password, user.password);
    //if (password !== user.password) return res.status(400).send('Mot de passe incorrect'); 
     
  
    res.render('cmd_a_livrer', { commande: pending_deliveries[0] }); 
      });
  //});



module.exports = router;