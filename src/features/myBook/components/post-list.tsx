import { getPosts } from '../queries/get-posts'
import PostItem from './post-item'
import SearchInput from '@/src/components/search-input'
import { SearchParams } from '../Types/SearchInput'
import Sorting from '@/src/components/sorting'
import Pagination from '@/src/components/pagination'
interface props{
    userId:string | undefined,
    searchParams:SearchParams
}
const PostList = async ({userId,searchParams}:props) => {
    const {posts,totalPages,currentPage}=await getPosts(userId,searchParams)
  return (
    <div>
      <div className="">
        <SearchInput placeholder="Search bookmarks" />
        <Sorting defaultValue='desc' options={[{label:"Newest",value:"desc"},{label:"Oldest",value:"asc"}]} />
        {posts.map((post) => (
          <PostItem key={post.id} {...post} />
          
        ))}
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default PostList
