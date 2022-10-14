import { IPost } from "../../../state/types";

const postReducer = (
    initialState: IPost,
    checkIsNewState: (state: IPost) => void
) => {
    return (state: IPost, action: { type: string; payload?: string }) => {
        switch (action.type) {
            case "title": {
                if (!action.payload) return state;
                const newState = { ...state, title: action.payload };
                checkIsNewState(newState);
                return newState;
            }
            case "content": {
                if (!action.payload) return state;
                const newState = { ...state, content: action.payload };
                checkIsNewState(newState);
                return newState;
            }
            case "load content": {
                if (!action.payload) {
                    console.error("content getting error");
                    return state;
                }
                const newState = {
                    ...state,
                    content: action.payload,
                };
                return newState;
            }
            case "reset": {
                checkIsNewState(initialState);
                return initialState;
            }
            default:
                return state;
        }
    };
};

export default postReducer;
