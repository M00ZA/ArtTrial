import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"

interface SubmitButtonProps {
  status: string,
  label?: string,
}

export const SubmitButton = ({ status, label = 'Update' }: SubmitButtonProps) => {
  return (
    <Button disabled={status === 'pending' ? true : false} className='w-fit' size='sm'>
      <span>{status === 'pending' ? <Loader className='animate-spin mr-3 size-5' /> : false}</span>
      <span>{label}</span>
    </Button>
  )
}