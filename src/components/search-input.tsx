"use client"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {useDebouncedCallback} from "use-debounce"
interface Props{
    placeholder?:string
}

const SearchInput = ({placeholder}:Props) => {
    const searchParam=useSearchParams();
    const pathname=usePathname();
    const {replace}=useRouter();
    const handleSearch =useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            const params=new URLSearchParams(searchParam);
            if(value){
                params.set("search",value)
            }else{
                params.delete("search")
            }
            replace(`${pathname}?${params.toString()}`,{scroll:false});
            
            
        },
        500
    )
  return (
    <div className="mb-4">
      <Input className="" placeholder={placeholder} onChange={handleSearch} defaultValue={searchParam.get("search")?searchParam.get("search")?.toString():""} />
    </div>
  )
}

export default SearchInput
