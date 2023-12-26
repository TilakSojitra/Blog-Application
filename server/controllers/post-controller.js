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

