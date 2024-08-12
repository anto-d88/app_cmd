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
  
  console.log(pending_deliveries[0])
  
  
if (error)return res.status(500).json({ error: error.message });
    res.render('cmd_a_livrer', { commande: pending_deliveries[0] }); 
      });
  //});



module.exports = router;