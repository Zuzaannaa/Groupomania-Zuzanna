const { Like } = require('../models/index.js');
const { User } = require('../models/index.js');

exports.likePost = (req, res) => {
    try {
        console.log(req.body);
        let { like, userId, postId } = req.body;
        Like.create({like, postId, userId})
            .then(newLike => {
                res.status(201).json(newLike);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};


exports.unlikePost = (req, res) => {
    console.log(req.body)
    try {
        Like.destroy({where: {postId: req.params.postId, userId: req.body.userId}})
            .then(like => {
                console.log(like);
                res.status(200);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};


exports.getAllLikesPost = (req, res) => {
    try {
        Like.findAll({where: {postId: req.params.postId}, include: User})
            .then(like => {
                res.status(200).json(like);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};