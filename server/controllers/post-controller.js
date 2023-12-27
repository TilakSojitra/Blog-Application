import post from "../models/post.js"


export const createPost = async (request,response) => {
    try{
        const p = await new post(request.body);
        p.save();

        return response.status(200).json('Post saved successfully');
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

