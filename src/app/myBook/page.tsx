import Heading from '@/src/components/heading'
import PostList from '@/src/features/myBook/components/post-list'
import { getSession } from '@/src/lib/get-session'
import { signIn } from '@/src/path';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Bookmark } from "@/generated/prisma/client"
import { SearchParams } from '@/src/features/myBook/Types/SearchInput';

interface Props{
  searchParams:SearchParams
}

const MyBook = async({searchParams}:Props) => {
  const session=await getSession();
  const param=await searchParams

  if(!session){
    return redirect(signIn)
  }
  return (
    <div>
      <Heading title='My Bookmarks' description='Your personal collection of bookmarks.' />
      <PostList userId={session.user.id} searchParams={param} />
        
    </div>
  )
}

export default MyBook
