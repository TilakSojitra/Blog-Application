import Comment from "../models/comment.js";

export const addComment = async (request,response) => {
    try{
        const comment = new Comment(request.body);
        comment.save();
        
        response.status(200).json({msg: 'comment added successfully'});
    }
    catch(error){
        return response.status(500).json(error.msg);
    }
}

export const getCommentsByPostId =  async (request,response) => {
    try{
        const comments = await Comment.find({ postId:request.params.id});

        return response.status(200).json(comments);
    }
    catch(error){
        return response.json(500).json(error.msg);
    }
}

export const deleteComment = async (request,response) => {
    try{
        await Comment.findByIdAndDelete(request.params.id);
        return response.status(200).json({msg : 'comment deleted successfully'});
    }
    catch(error){
        return response.status(500).json(error.msg);
    }
}