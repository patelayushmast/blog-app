import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { Fullblog } from "../components/Fullblog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    if(loading || !blog) {
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner/>
                </div>
            </div>
        </div>
    }
    return <div>
        <Fullblog blog={blog} />
    </div>
}