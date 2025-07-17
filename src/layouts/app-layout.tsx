import React, { type ReactNode } from 'react'
import { Footer } from '../shared/ui/footer';

interface Props {
    children?: ReactNode;
}

export const AppLayout:React.FC<Props> = ({children}) => {
  return (
    <div className="absolute flex flex-col w-full h-screen pt-4">
        <div className='px-6'>
          {children}
        </div>
        <Footer />
    </div>
  )
}