const { Post } = require('../models/index.js');
const { User } = require('../models/index.js');
const fs = require('fs');

exports.getAllPosts = (req, res) => {
    try {
        Post.findAll({ include: User })
            .then(posts => {
                res.status(200).json(posts);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

exports.getOnePost = (req, res) => {
    try {
        Post.findOne({where: {id:req.params.id}})
            .then(post => {
                console.log("Post found", post.id);
                res.status(200).json(post);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

exports.createPost = (req, res) => {
    if (req.file) {
        req.body.file = req.file.filename;
    } else {
        req.body.file = null;
    };
    try {
        console.log(req.body);
        let { text, file, userId } = req.body;
        Post.create({text, file, userId})
            .then(newPost => {
                console.log("nwe post created");
                res.status(201).json(newPost);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};

exports.editPost = (req, res) => {
    req.file ? req.body.file = req.file.filename : console.log("use same photo"); 
    if (req.file) {
        Post.findOne({where: {id:req.params.id}})
            .then(post => {
                if(post.file) { 
                    fs.unlink(`images/${post.file}`, (error) => {
                        if (error) throw err
                    })    
                }
            })
            .catch(error => res.status(400).json(error));
    }
    try {
        Post.update(req.body, {where: {id: req.params.id}})
            .then(() => {
                let updatedPost = {...req.body}
                res.status(201).json(updatedPost)
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

exports.deletePost = (req, res) => {
    try {
        Post.findOne({where: {id:req.params.id}})
            .then(post => {
                if(post.file) { 
                    fs.unlink(`images/${post.file}`, (error) => {
                        if (error) throw err
                    })  
                }
                Post.destroy({where: {id:req.params.id}})
                    .then(post => {
                        res.status(200).json(post);
                    })
                    .catch(error => res.status(400).json(error))    
            })
    } catch {
        error => res.status(500).json(error);
    }
};