import { CreateBookmarkForm } from "@/src/features/myBook/components/create-bookmark-form"
import { getSession } from "@/src/lib/get-session"
import { signIn, signUp } from "@/src/path"
import { redirect } from "next/navigation"

const  CreatePost = async() => {
  const session=await getSession()
  if(!session){
    redirect(signUp)
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <CreateBookmarkForm />
    </div>
  )
}

export default CreatePost
