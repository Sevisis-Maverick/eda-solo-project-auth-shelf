const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('tryna get items');
  console.log('req.user:', req.user);
  pool.query('SELECT * FROM "item"')
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error receiving all items from database", error);
      res.sendStatus(200); // For testing only, can be removed
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('tryna add item');
  console.log(req.user);
  console.log(req.body);
  let queryText = `INSERT INTO "item" ("description", "image_url", "user_id") VALUES ($1,$2,$3)`;
  pool.query(queryText, [req.body.description, req.body.image_url, req.user.id]).then(result => res.sendStatus(200)).catch(err => {
    console.log('Router e// rror in posting item', err);
    res.sendStatus(500);
  })
  // code here
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('tryna delete an item');

  console.log(req.params.id);
  let id = req.params.id; let queryText = `DELETE FROM "item" WHERE "id" = $1 AND "user_id" = $2`;

  pool.query(queryText, [id, req.user.id])
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('Error deleting item', err);
    });
});

  /*
   * Update an item if it's something the logged in user added
   */
router.put('/:id', (req, res) => {
    // PUT route code here
    console.log(req.params.id);
    console.log("Editing item", req.body); //PLEASE CONFIRM
    let queryText = `UPDATE "item" SET "description"=$2, "image_url"=$3 WHERE "id"=$1`; // UPDATE songs SET rank=rank+1 WHERE id=$1
    pool.query(queryText, [req.params.id, req.body.description, req.body.image_url]) // needs 2 more parameters for $3, $4
      .then(result => {
        res.sendStatus(204);
      })
      .catch(err => {
        console.log('Error EDITING item in shelf router', err);
        res.sendStatus(500);
      });
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
});
  module.exports = router; 
