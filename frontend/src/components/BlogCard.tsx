import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: Number
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}> <div className="p-4 border-b-2 border-slate-100 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <Avatar size="small" name={authorName}/>
            <div className="flex justify-center flex-col pl-2 font-extralight">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2"><Circle/></div>
            <div className="flex justify-center flex-col pl-2 font-thin text-slate-500">
                {publishedDate}
            </div>
        </div>
        <div className="font-semibold text-xl">
            {title}
        </div>
        <div className="font-thin text-md text-slate-500">{content.slice(0, 100) + "..."}</div>
        <div className="font-extralight text-sm text-slate-400">{`${Math.ceil(content.length / 100)} minutes`}</div>
    </div></Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}

export function Avatar({name, size}: {name: string, size?: "small"|"big"}){
    return (
    <div className={`relative inline-flex items-center justify-center ${size === "small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>)
    
}