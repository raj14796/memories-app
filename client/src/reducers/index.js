import { combineReducers } from 'redux'
import posts from "./posts"
import selectedPostId from "./selectedPost";
import deletedPost from "./deletePost";


export default combineReducers({
    posts,
    selectedPostId,
    deletedPost
})