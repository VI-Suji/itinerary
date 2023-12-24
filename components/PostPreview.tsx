import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
  return (
    <Link href={`/posts/${props.slug}`}>
    <div
      className="border border-slate-300 p-4 rounded-md shadow-sm bg-slate-800"
    >
      <p className="text-sm text-slate-400 my-2">{props.date}</p>

      <img src={props.img} className="rounded-md"/>

        <h2 className=" text-white hover:underline my-3 text-center font-bold mt-4 text-2xl">{props.title}</h2>
        <h3 className=" text-white hover:underline my-3">{props.description}</h3>
    </div>
    </Link>
  );
};

export default PostPreview;
