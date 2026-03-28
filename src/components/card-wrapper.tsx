import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  type Props={
    title:string,
    description:string
    children:React.ReactNode,
    footer?:React.ReactNode
  }
const CardWrapper = ({title,description,children,footer}:Props) => {
  return (
    <div>
      <Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
  {footer && <CardFooter>
    {footer}
  </CardFooter>}
</Card>
    </div>
  )
}

export default CardWrapper
