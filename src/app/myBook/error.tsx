"use client"
interface errorProps {
    error:Error,
    reset():void    
}
const error = ({error,reset}:errorProps) => {
  return (
    <div>
      <h2 className='text-2xl text-center text-red-500'>{error.message || "Something went wrong"}</h2>
        <button onClick={()=>reset()} className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4">Try Again</button>
    </div>
  )
}

export default error
