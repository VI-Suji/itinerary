import React from 'react';
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import style from './markdown-styles.module.css';
import gfm from 'remark-gfm'


function Blog(props: { content: any; }) {
    const {data, content} = matter(props.content);

    return (
        <div id="blog-post-container">
            <div className="container">
            <h1 className="text-center">{data.title}</h1>
            <h3>{data.description}</h3>
            <ReactMarkdown remarkPlugins={[gfm]} className={style.reactmarkdown}>{content}</ReactMarkdown>
            </div>
        </div>
    );
}

export const getServerSideProps = async (context: { params: { blog: any; }; }) => {

    const fs = require("fs");

    const {blog} = context.params;

    const content = fs.readFileSync(`${process.cwd()}/content/${blog}.md`, 'utf8')

    return {
        props: {
            content
        }
    };
}

export default Blog;