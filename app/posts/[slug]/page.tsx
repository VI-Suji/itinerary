import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../../../components/getPostMetadata";
import createArray from "../../../components/getArray";
// import Image from "next/image";

const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  const array = createArray(post.content);
  return (
    <div className="">
      <div className="my-4 text-center">
        <h1 className="text-2xl text-slate-600 font-bold">{post.data.title}</h1>
        <p className="text-slate-400 my-4">{post.data.date}</p>
        <img src={post.data.img} className="rounded-md w-full h-80"/>
      </div>

      <article className="prose">
        {array.map((arr, index) => (
          <div key={index} className='text-center'>
            <div className="text-center bg-slate-800 p-4 my-2 rounded-md text-white">
              {arr.day} ({arr.date})
            </div>
            {/* <div className="flex justify-center items-center">
              <img src={arr.icon} alt={arr.company_name} className="w-96 h-50 rounded-md" />
            </div> */}
            <div className="flex flex-col sm:flex-row justify-center items-center">
      <img
        src={arr.icon} alt={arr.company_name} 
        className="w-full sm:w-1/2 mb-4 mr-2 sm:mb-0 rounded-md h-40"
      />
      <img
        src={arr.iconBg} alt={arr.company_name} 
        className="w-full sm:w-1/2 mb-4 mr-2 sm:mb-0 rounded-md h-40"
      />
    </div>
            <div className="text-left bg-white-800 rounded-md text-black">
              {arr.points.map((point : any, index: any) => (
                <div key={index}
                  className={`bg-white-800 rounded-md text-black ${point !== '' ? '' : 'hidden'}`}>
                  {point !== '' && point.startsWith('###') && <h3>{point.replace("-", "").replace("###", "")}</h3>}
                  {point !== '' && (point.startsWith('- ###') ) && <h3  className="text-blue-500"><ul><li>{point.replace("-", "").replaceAll("#", "")}</li></ul></h3>}
                  {point !== '' && (point.startsWith('- ##') && !point.startsWith('- ###')) && <h4><ol><li>{point.replace("-", "").replaceAll("#", "")}</li></ol></h4>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};

export default PostPage;
