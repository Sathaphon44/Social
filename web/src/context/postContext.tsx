import { createContext, useContext, useEffect, useState } from "react";
import { CommentModel, PostModel } from "../models/post";
import ApiServices from "../api";
import { authContext } from "./authContext";
const api = new ApiServices();

interface PostContextType {
    posts: PostModel[];
    setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
    comments: CommentModel[];
    setComments: React.Dispatch<React.SetStateAction<CommentModel[]>>;
    rePost: () => void;
};

interface PostProviderType {
    children: React.ReactNode;
}

export const postContext = createContext<PostContextType | null>(null)


export default function PostProvider(props: PostProviderType) {
    const auth = useContext(authContext)
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [comments, setComments] = useState<CommentModel[]>([]);


    useEffect(() => {
        fetchData();
    }, [auth]);

    const rePost = () => {
        fetchData();
    }


    const fetchData = async () => {

        const [post]: any = await Promise.all([
            api.GetPost()
        ])

        setPosts(post.data);
    }

    return (
        <postContext.Provider value={{
            posts,
            setPosts,
            rePost,
            comments,
            setComments
        }}>
            {props.children}
        </postContext.Provider>
    )
}