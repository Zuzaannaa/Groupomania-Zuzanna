const { Comment } = require('../models/index.js');
const { User } = require('../models/index.js');
exports.getAllComments = (req, res) => {
    try {
        Comment.findAll({where: {postId: req.params.postId}, include: User})
            .then(comments => {
                res.status(200).json(comments);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

exports.createComment = (req, res) => {
    try {
        let { text, userId, postId } = req.body;
        Comment.create({text, postId, userId})
            .then(newComment => {
                res.status(201).json(newComment);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};

exports.getOneComment = (req, res) => {
    try {
        Comment.findOne({where: {id:req.params.id}, include: User})
            .then(comment => {
                res.status(200).json(comment);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

exports.deleteComment = (req, res) => {
    try {
        Comment.destroy({where: {id:req.params.id}})
            .then(() => {
                res.status(200);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

exports.editComment = (req, res) => {
    console.log(req.body)
    try {
        Comment.update(req.body, {where: {id: req.params.id}})
            .then(() => {
                let updatedComment = {...req.body}
                res.status(201).json(updatedComment)
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};