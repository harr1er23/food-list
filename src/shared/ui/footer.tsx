import { Button } from '@mantine/core'
import { BookMarkedIcon, CalendarCheckIcon, NotebookPenIcon, ShoppingBasket } from 'lucide-react'

export const Footer = () => {
  return (
    <div className="flex justify-between gap-2 mt-auto bg-white px-2 py-4 border border-t-1 border-b-0 border-x-0 rounded-t-xl border-gray-300 shadow-amber-300">
        <Button 
          leftSection={
            <div 
              className='flex flex-col gap-1 text-sm items-center'>
              <BookMarkedIcon/> Diary
            </div>
          }
          size='xl' 
          variant='transparent' 
          className='!text-black !font-light gap-2'>
        </Button>
        <Button 
          leftSection={
            <div 
              className='flex flex-col gap-1 text-sm items-center'>
              <NotebookPenIcon /> Recipes
            </div>
          }
          size='xl' 
          variant='transparent' 
          className='!text-black !font-light'>
        </Button>
        <Button 
          leftSection={
            <div 
              className='flex flex-col gap-1 text-sm items-center'>
              <ShoppingBasket /> Products
            </div>
          } 
          size='xl' 
          variant='transparent' 
          className='!text-black !font-light'>
        </Button>
        <Button 
          leftSection={
            <div 
              className='flex flex-col gap-1 text-sm items-center'>
              <CalendarCheckIcon /> Planner
            </div>
          } 
          size='xl' 
          variant='transparent' 
          className='!text-black !font-light'>
        </Button>
    </div>
  )
}