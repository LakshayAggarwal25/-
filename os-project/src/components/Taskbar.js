import React,{useState,useEffect} from 'react'
import FolderIcon from "./assets/folder-icon.svg"
import Folders from './Folders';
function Taskbar() {
    const [folders, setFolders] = useState(false);
    let openRoot = ()=>{
        if(folders === true){
            setFolders(false);
        }else{
            setFolders(true);
        }
    }
    return (
        <>
            <div className="absolute border-2 bg-white bottom-0 h-[6vh] left-0 p-4 w-full flex justify-center gap-4 align-center">
                <input type="text" className='border-2 rounded-lg w-40' placeholder='Search for files' />
                <img src={FolderIcon} onClick={openRoot} className="max-h-full" />
                <img src={FolderIcon} className="max-h-full" />
                <img src={FolderIcon} className="max-h-full" />
                <img src={FolderIcon} className="max-h-full" />
            </div>
            <Folders folderState={folders} folderStateFun={setFolders}/>
        </>
    );
}

export default Taskbar