import * as api from "../api/index"

export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.fetchPosts();
        //console.log("data : "+res.data.find((d)=>{if(d==1){return d}}))

        dispatch({
            type: "FETCH_ALL",
            payLoad: res.data
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const createPosts = (newPost) => async (dispatch) => {
    try {
        const { data } = await api.createPosts(newPost);
        dispatch({
            type: "CREATE",
            payLoad: data
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);
        dispatch({
            type: "UPDATE",
            payLoad: data
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const setSelectedPost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "SET_SELECTED_POST_ID",
            payLoad: id
        })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        const res = await api.deletePost(id);
        dispatch({
            type: "DELETE",
            payLoad: { data: res.data, _id: id }
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({
            type: "LIKE",
            payLoad: data
        })
    } catch (error) {
        console.log(error);
    }
}