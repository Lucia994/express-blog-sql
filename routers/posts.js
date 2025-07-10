const express = require("express")
const router = express.Router();
// const port = 3000
const postslist = require("../data/postslist");
const postController = require('../controllers/postController')

//Add a route to get blog posts 
//Index
router.get('/', postController.index)

/*Show (read)*/
router.get('/:id', postController.show)

/*Store (create)*/
router.post('/', postController.store)

/*Update (update)*/
router.put('/:id', postController.update)

/*Modify (update) */
router.patch('/:id', postController.update)
/*Destroy (delete) */
router.delete('/:id', postController.destroy)

module.exports = router;