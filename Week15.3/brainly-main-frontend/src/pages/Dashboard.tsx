import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { SideBar } from '../components/SideBar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, getContents } = useContent();

  useEffect(() => {
    getContents();
  }, [modalOpen]);

  return (
    <div>
      <SideBar />
      <div className="ml-72 p-4 min-h-screen bg-gray-100 border-2">
        <CreateContentModal open={modalOpen} onClose={() => {setModalOpen(false)}}/>
        <div className='flex gap-4 justify-end pt-4'>
          <Button onClick={async () => {
            try{
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                    share: true, 
                }, {
                    headers : {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                
                const shareUrl = `${BACKEND_URL}/api/v1/brain/:${response.data.hash}`;
                // Copy the text inside the text field
                navigator.clipboard.writeText(shareUrl);
                alert(shareUrl);
            } catch (err) {
                console.log(`Could not fetch the share url: ${err}`);
            }
          }} variant="secondary" text="Share brain" startIcon={<ShareIcon />}/>
          <Button onClick={() => {setModalOpen(true)}} variant="primary" text="Add content" startIcon={<PlusIcon />}/>  
        </div>
        <div className='flex gap-4 flex-wrap'>
          {contents.map(({ title, link, type }) => 
            <Card type={type} 
            link={link} 
            title={title} />
          )}
         

        </div>
      </div>
      
      
    </div>
  )
}

export default Dashboard
