const postslist = require("../data/postslist");
const connection = require('../data/db');

function index(req, res) {
    // res.json(postslist);
    // prepariamo la query
    const sql = 'SELECT * FROM posts';
    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}


function show(req, res) {
    const id = parseInt(req.params.id)
    const post = postslist.find(post => post.id === id);

    if (!post) {
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    res.json(post)
}
function store(req, res) {
    console.log(req.body, "This is the req.body");
    //Create an id for the current pizza object
    const postId = postslist[postslist.length - 1].id + 1
    console.log(postId);
    //construct the object literal taking the data from the req.body
    const newPostObj = {

        title: req.body.title,
        content: req.body.content,
        img: req.body.img,
        tags: req.body.tags
    }
    //push into the posts array
    postslist.push(newPostObj)
    console.log(postslist);
    //provide
    res.status(201).json(newPostObj)
    // res.send(`Save a new post into db`)

}
function update(req, res) {
    const id = parseInt(req.params.id)
    const post = postslist.find(post => post.id === id)
    if (!post) {
        return res.status(404).json({
            erro: true,
            message: "Not found"
        })
    }
    post.title = req.body.title
    post.content = req.body.content
    post.img = req.body.img
    post.tags = req.body.tags

    // res.send(`You want to update post with id:${id}`)
}
function destroy(req, res) {
    const id = parseInt(req.params.id)
    const post = postslist.find(post => post.id === id);
    if (!post) {
        res.status(404);
        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    postslist.splice(postslist.indexOf(post), 1)
    console.log(postslist);
    res.sendStatus(204)
}

module.exports = { index, show, store, update, destroy }

