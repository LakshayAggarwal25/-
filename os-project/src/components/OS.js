import React,{useState} from 'react'
import Folders from './Folders'
import Taskbar from './Taskbar'

function OS() {
  const [activeApp, setActiveApp] = useState(null);
    return (
    <>
        <div>
        {activeApp === "RootFolder" && <Folders/>}
        <Taskbar activeApp setActiveApp/>
        </div>
    </>
  )
}

export default OS