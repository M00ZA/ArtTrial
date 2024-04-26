import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const AdminSearch = () => {
  return (
    <div className="w-[350px] relative">
      <Input placeholder='Search....' />
      <Search className='text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-3' />
    </div>
  )
}

