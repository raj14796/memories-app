const deletedPost = (id = null, action) => {
    switch (action.type) {
        case "DELETE": return action.payLoad.data;
        default: return null;
    }
}

export default deletedPost;