import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const getPosts = async (req, res) => {
    const query = req.query;
    // console.log(query);
    try {
        const posts = await prisma.post.findMany({
            where:{
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                bathroom: parseInt(query.bathroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 100000000
                }
            }
        })
        // setTimeout(() => {
        //     res.status(200).json(posts)
        // }, 3000);
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to get postS" })
    }
}
export const getPost = async (req, res) => {
    try {
        const id = req.params.id
        const post  = await prisma.post.findUnique({
            where:{id},
            include:{
                postDetail:true,
                user:{
                    select:{
                        username: true,
                        avatar: true
                    }
                }
            }
        })

        const token = req.cookies?.token;

        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
                if (!err) {
                    const saved = await prisma.savedPost.findUnique({
                        where: {
                            userId_postId: {
                                postId: id,
                                userId: payload.id,
                            },
                        },
                    });
                    return res.status(200).json({ ...post, isSaved: saved ? true : false });
                }
                 return res.status(200).json({ ...post, isSaved: false });
            });
        }
        res.status(200).json({ ...post, isSaved: false });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to get post" })
    }
}
export const addPost = async (req, res) => {
    try {
        const body = req.body;
        const tokenUserID = req.userId;
        const newPost = await prisma.post.create({
            data:{
                ...body.postData,
                userId:tokenUserID,
                postDetail:{
                    create: body.postDetail
                }
            }
        })
        res.status(200).json(newPost)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to add post" })
    }
}
export const updatePost = async (req, res) => {
    try {
        res.status(200).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to update post" })
    }
}
export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where:{id:postId}
        })

        if(!post){
            return res.status(404).json({message: "Post not found"})
        }
        if( post.userId !== tokenUserId){
            return res.status(403).json({message: "You are not authorized to delete this post"}) 
        }
        await prisma.post.delete({
            where:{id: postId}
        })
        res.status(200).json({message: "Post deleted successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to delete post" })
    }
}