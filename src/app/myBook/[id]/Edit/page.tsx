import { EditPost } from "@/src/features/myBook/components/edit-post"
import { getPost } from "@/src/features/myBook/queries/get-post"
import { isOwner } from "@/src/lib/is-owner"
type Props={
    params:Promise<{id:string}>
}
const Edit = async({params}:Props) => {
    const {id}= await params
    const post=await getPost(id)
    if(!post){
        throw new Error("Post not found")
    }
    const owner=await isOwner(post.user.id!)
    if(!owner){
        throw new Error("You are not the owner of this post")
    }
  return (
    <div>
      <EditPost post={post} />
    </div>
  )
}

export default Edit
