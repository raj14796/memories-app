const selectedPostId = (id=null, action) => {
    switch(action.type){
        case "SET_SELECTED_POST_ID":
            return action.payLoad;
        default :
            return null;
    }
}

export default selectedPostId;