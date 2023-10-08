import React from 'react';
import Link from 'next/link';

type Params = {
    blog : {
        [key: string]: any
    }
}

export default function BlogPost({ blog } : Params) {
    return (
        <div className="blogPost">
              <div>
              <img src={blog.img} />
              <div className="date">{blog.date}</div>
              <Link href={`/posts/${blog.slug}`}>
                <h1 className="blogTitle">{blog.title}</h1>
              </Link>
              <p>{blog.description}</p>
              </div>
              <h3>{blog.content}</h3>
        </div>
    );
}