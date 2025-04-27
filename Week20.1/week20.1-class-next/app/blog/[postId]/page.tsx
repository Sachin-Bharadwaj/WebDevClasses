import axios from "axios";

type paramstype = {postId: string};

export default async function BlogPage({params}: any) {
    const blogId = (await params).postId;
    console.log(blogId);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${blogId}`);

    return (
        <div>
            {JSON.stringify(response.data)}
        </div>
    )
}