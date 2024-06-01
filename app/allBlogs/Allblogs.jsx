"use client"
import React from 'react'

import { BlogCard } from '@/components/component/blog-card';
import { Loader } from '@/components/component/loader';
import { useData } from '@/context/DataContext';




const Allblogs = () => {
    const { blogData }=useData()

console.log(blogData && blogData);
  return (
    <div className="flex flex-wrap mx-auto">

      { blogData &&  blogData.map((e)=>  <BlogCard   key={e._id}  id={e._id} maintitle={e.maintitle} maincontent={e.maincontent} author={e.author} image={e.images[0]}  />)  ||<Loader />}
      </div>
  )
}

export default Allblogs
