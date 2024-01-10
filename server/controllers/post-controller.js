import post from "../models/post.js"


export const createPost = async (request,response) => {
    try{
        const p = await new post(request.body);
        p.save();

        return response.status(200).json('Post added successfully');
    }
    catch(error){
        return response.status(500).json(error); 
    }
}

export const getAllPost = async (request,response) => {
    let category = request.query.category;
    try{
        let posts;
        if(category){
            posts = await post.find({ categories: category})
        }
        else{
            posts = await post.find({});
        }
        return response.status(200).json(posts);
    }
    catch(error){
        return response.status(500).json(error); 
    }
}

export const getPost = async (request,response) => {
    try{
        const id = request.params.id;
        let p = await post.findById(id);
        return response.status(200).json(p);
    }
    catch(error){
        return response.status(500).json(error);
    }
}

export const updatePost = async (request,response) => {
    try{
        const p = await post.findById(request.params.id);

        if(!p){
            return response.status(404).json({ msg: 'post not found'});
        }

        await post.findByIdAndUpdate(request.params.id,{ $set: request.body});

        return response.status(200).json({msg: 'Post Updated successfully'});
    }
    catch(error){
        return response.status(500).json(error);
    }
}

export const deletePost = async (request,response) => {
    try{
        const p = await post.findById(request.params.id);

        if(!p){
            return response.status(404).json({ msg: 'post not found'});
        }

        await post.findByIdAndDelete(p._id);

        return response.status(200).json({msg: 'Post deleted successfully'});
    }
    catch(error){
        return response.status(500).json(error);
    }
}