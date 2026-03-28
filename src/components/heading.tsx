import { Separator } from "@/components/ui/separator"
import { SeparatorHorizontal } from "lucide-react"

type Props={
    title:string,
    description:string
}
const Heading = ({title,description}:Props) => {
  return (
    <div>
      <div className="space-y-2 m-4">
        <h1 className='text-2xl font-extrabold font-mono'>{title}</h1>
        <p className='text-sm text-zinc-600 dark:text-zinc-400'>{description}</p>
      </div>
      
    </div>
  )
}

export default Heading
