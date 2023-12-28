import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
})

const Comment = mongoose.model('comments',commentSchema);

export default Comment;