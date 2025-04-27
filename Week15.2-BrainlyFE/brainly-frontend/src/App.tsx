import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {


  return (
    <>
      <div className='flex'>
        <Button  startIcon={<PlusIcon size={"lg"} />} 
        size="lg" 
        variant="primary" 
        text="Share"
        endIcon={<ShareIcon size={"lg"} />}
        />

      <Button  startIcon={<PlusIcon size={"md"} />} 
        size="md" 
        variant="secondary" 
        text="Share"
        endIcon={<ShareIcon size={"md"} />}
        />

      <Button  startIcon={<PlusIcon size={"sm"} />} 
        size="sm" 
        variant="primary" 
        text="Share"
        endIcon={<ShareIcon size={"sm"} />}
        />
      </div>
      
      
    </>
  )
}

export default App
