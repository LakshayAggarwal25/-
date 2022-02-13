import React from 'react'
import FolderIcon from "./assets/folder-icon.svg"
function Taskbar(props) {
    let openRoot = () => {
        props.setActiveState("RootFolder");
    }
    return (
        <>
            <div className="absolute border-2 bg-white bottom-0 h-16 left-0 p-4 w-full flex justify-center gap-4 align-center">
                <input type="text" className='border-2 rounded-lg w-40' placeholder='Search for files' />
                <img src={FolderIcon} onClick={openRoot} className="max-h-full" />
                <img src={FolderIcon} className="max-h-full" />
                <img src={FolderIcon} className="max-h-full" />
                <img src={FolderIcon} className="max-h-full" />
            </div>
        </>
    );
}

export default Taskbar