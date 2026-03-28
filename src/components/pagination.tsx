"use client";
import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
interface PaginationProps {
    totalPages: number
    currentPage: number
}
const Pagination = ({totalPages,currentPage}:PaginationProps) => {
const  searchParams=useSearchParams();
const pathname=usePathname();
const {replace}=useRouter();
const handleSkipPage=(page:number)=>{
    const params=new URLSearchParams(searchParams);
    if(page>1){
        params.set("page",page.toString())
    }else{
        params.delete("page")
    }
    replace(`${pathname}?${params.toString()}`,{scroll:false});
}
  return (
    <div className="flex items-center justify-end gap-4">
      <Button variant={"outline"} onClick={()=>handleSkipPage(currentPage-1)} disabled={currentPage<=1}>Previous</Button>
      <span>{currentPage} of {totalPages}</span>
      <Button variant={"outline"} onClick={()=>handleSkipPage(currentPage+1)} disabled={currentPage>=totalPages}>Next</Button>
    </div>
  )
}

export default Pagination
