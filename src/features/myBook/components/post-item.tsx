import { Bookmark } from "@/generated/prisma/client"
import DeleteButton from "./delete-post-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { editPost } from "@/src/path"
import { User } from "@prisma/client"
import { getSession } from "@/src/lib/get-session"

interface Props extends Bookmark{
 
   user:User
}
const PostItem =async ({id,title,description,url,category,tags,createdAt,updatedAt,user}:Props) => {
    const session=await getSession();
  return (
    <div>
      
        <div key={id} className="border p-4  rounded mb-4">
        <div className="space-y-1">
        <h2 className="text-2xl font-bold">{title} 
         <span className="px-4 text-muted-foreground text-sm">({user.name})</span>
        </h2>
         <p className="text-muted-foreground">{description}</p>
         <div className="flex items-center justify-between gap-4">
         <a href={url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
           Visit
         </a>
         <div className="flex items-center justify-center gap-3">
        
        {session?.user.id===user.id && 
          <Link href={editPost(id)}><Button variant="outline" size="sm" className="ml-2">Edit</Button></Link>
          }
          {session?.user.id===user.id && 
          <DeleteButton id={id} />
          }
         </div>
         </div>
        </div>
       </div>
      
    </div>
  )
}

export default PostItem
