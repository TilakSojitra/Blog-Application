export const SERVICE_URLS = {
  userSignup: { url: '/signup', method: 'POST' },
  userLogin: { url: '/login', method: 'POST' },
  existUser: {url: '/checkuser', method:'GET', query:true},
  uploadFile: {url: 'file/upload', method:'POST'},
  createPost: {url: 'create', method:'POST'},
  getAllPosts: {url: '/posts', method:'GET', params:true},
  getPostById: {url: 'post', method:'GET', query:true },
  updatePost: {url: 'update', method:'PUT', query:true},
  deletePost: {url: 'delete', method:'DELETE', query:true},
  addComment: {url: '/comment/add', method:'POST'},
  getCommentsById: {url: '/comment/get', method:'GET', query:true},
  deleteComment: {url:'/comment/delete', method:'DELETE', query:true},
};
