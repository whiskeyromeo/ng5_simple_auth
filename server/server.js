const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const jwt = require('jwt-simple');

const config = require('./.config');
const auth = require('./auth');

var User = require('./models/User');
var Post = require('./models/Post');

app.use(cors())
app.use(bodyParser.json())

/**
 * GET all posts
 */
app.get('/posts', auth.checkAuthenticated, async (req, res) => {
    // NOTE : the lean call is VERY important to tag on if you want to 
    // modify objects coming from mongoose
    var posts = await Post.find({},'-__v').lean()

    for (let i in posts) {
        let authorId = posts[i].author;
        if(authorId == req.userId) {
            Object.assign(posts[i], {isAuth: true});
        }
        posts[i].author = await User.findById(authorId, '-__v -passwd');
    }

    res.status(200).send(posts);
})

/**
 * GET a post by id
 */
app.get('/posts/:id', async (req, res) => {
    var author = req.params.id
    var posts = await Post.find({author},'-__v')
    res.status(200).send(posts);
})

/**
 * PUT(update) a post
 */
app.put('/post/:id', auth.checkAuthenticated, (req, res) => {
    delete req.body.isAuth;
    delete req.body._id;    // Must delete the _id from the body before updating
    req.body.author = req.body.author._id;
    console.log('after update: ', req.body);

    Post.update({'_id': req.params.id}, req.body, {upsert: true},(err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: 'Error updating post'});
        } else {
            console.log('update success: ',result)
            res.status(200).send({message: 'Post successfully updated'});
        }
    })
})

/**
 * DELETE a post
 */
app.delete('/post/:id', auth.checkAuthenticated, (req, res) => {
    Post.deleteOne({_id: req.params.id, author: req.userId}, (err, result) => {
        if (err) {
            res.status(500).send({message: 'Error deleting post'});
        } else {
            res.status(200).send({message: 'Successfully deleted post'});
        }

    })
})

/**
 * POST/(create) a post
 */
app.post('/post', auth.checkAuthenticated, (req, res) => {

    var post = new Post({
        title: req.body.title, 
        content: req.body.content, 
        createdAt: Date.now(), 
        updatedAt: Date.now(),
        author: req.userId
    })

    post.save(post, (err, result) => {
        if (err) {
            console.error('Post save error: ', err)
            res.status(500).send({message: 'Post save error'});
        } else {
            res.status(200)
        }   
    })

})

/**
 * GET all users
 */
app.get('/users', async (req, res) => {
    try {
        console.log(req.userId);
        var users = await User.find({}, '-passwd -__v')
        res.send(users)
    } catch(err) {
        console.log('get users error: ', err)
        res.status(500);
    }
})

/**
 * GET a user by id
 */
app.get('/profile/:id', async (req, res) => {
   try {
        var user = await User.findById(req.params.id, '-passwd -__v')
        res.send(user)
   } catch(err) {
        console.log('get profile err: ', err)
        res.status(500);
   }
})

/**
 * Connect to the DB specified in .config file
 */
mongoose.connect(`mongodb://${config.dbUser}:${config.dbPassword}@ds229468.mlab.com:29468/node_ang_auth`,(err) => {
    if (!err) {
        console.log('connected to mongo');
    }
})

// Will still need server side validation
app.use('/auth', auth.router);

app.listen(3000)