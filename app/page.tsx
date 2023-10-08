"use client"

import React, { useEffect, useState } from 'react';
import BlogPost from '@/components/Blog/Blog';
import matter from 'gray-matter';


export default function Home() {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/readFiles'); // Use the API route
        if (response.ok) {
          const result = await response.json();
          setData(result.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const realData = data.map((blog) => matter(blog));
  const listItems = realData.map((listItem) => listItem.data);

  return (
    <section id="index-page">
      <h1 id="blog-header">Our itinerarys</h1>
      <div className="container">
        <div className="blogsContainer">
          {listItems.map((blog, i) => (
            <BlogPost key={blog.slug || i} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
