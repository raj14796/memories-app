import mongoose from 'mongoose';
import PostMessage from '../models/postMessage';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        return res.status(200).json(postMessages);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const createPost = (async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
})

export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("No post with that id");
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id");
    }
    const postCreator = await PostMessage.findOne({_id:_id});
    const deletePost = await PostMessage.findByIdAndRemove(_id);

    res.json({ message: `Post deleted successfully created by ${postCreator.creator}` });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send("No post with that id");
        }
        const postCreator = await PostMessage.findOne({_id:_id});
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount : postCreator.likeCount+1 }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
}
