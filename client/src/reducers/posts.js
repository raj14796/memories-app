

const posts = (posts = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payLoad;
        case "CREATE":
            return [...posts, action.payLoad];
        case "UPDATE":
            return posts.map((post) => post._id === action.payLoad._id ? action.payLoad : post);
        case "DELETE":
            return posts.filter((post) => post._id !== action.payLoad._id);
        case "LIKE":
            return posts.map((post) => post._id === action.payLoad._id ? action.payLoad : post);
        default:
            return posts;
    }
}

export default posts;