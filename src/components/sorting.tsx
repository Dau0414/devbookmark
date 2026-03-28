"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
interface Props{
    defaultValue:string,
    options:{label:string,value:string}[]
}
const Sorting = ({defaultValue,options}:Props) => {
    const searchParam=useSearchParams();
    const pathname=usePathname();
    const{replace}=useRouter();
    const handleSorting=(value:string)=>{
        const params=new URLSearchParams(searchParam);
        if(value===defaultValue){
            params.delete("sort")
        }else if(value){
            params.set("sort",value)
        }
        else{
            params.delete("sort")
        }
        replace(`${pathname}?${params.toString()}`,{scroll:false});
    }
  return (
    <div className="mb-4">
     <Select
  value={searchParam.get("sort") || defaultValue}
  onValueChange={handleSorting}
>
  <SelectTrigger className="">
    <SelectValue placeholder="Sort by" />
  </SelectTrigger>

  <SelectContent>
    <SelectGroup>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
    </div>
  )
}

export default Sorting
