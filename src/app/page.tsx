import React from 'react'
import Heading from '../components/heading'
import PostList from '../features/myBook/components/post-list'
import { SearchParams } from '../features/myBook/Types/SearchInput'
interface prop{
  searchParams:SearchParams
}
const page = async({searchParams}:prop) => {
 const param=await searchParams
  return (
    <div>
      <Heading title='Welcome to DevBookmark' description='Your personal bookmark manager for developers.' />
      
      <PostList userId={undefined} searchParams={param}  />
    </div>
  )
}

export default page
