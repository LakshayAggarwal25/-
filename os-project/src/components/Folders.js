import React from 'react'

function Folders({ folderState, folderStateFun }) {
  if (folderState === false) {
    return <></>;
  }

  let closeFolder = () => folderStateFun(false);
  let btnStyleClass = "border-b-4 w-full p-1 rounded-2xl text-right text-sm hover:bg-gray-400 hover:border-black";
  return (
    <>
      <div className='Folder-Box w-[80vw] h-[80vh] bg-white m-auto mt-[7vh] overflow-hidden rounded-lg'>
        <div className='Title-bar flex text-2xl p-2 items-center'>
          <div className='w-full text-center'>Current Folder Name</div>
          <div className='text-center mr-2 text-4xl cursor-pointer	' onClick={closeFolder}>&times;</div>
        </div>
        <hr />
        {/* <div onClick={loadFromLocalStorage}>check</div> */}
        <div className='Folder-Sidebar flex w-[15%] h-full border-r-2'>
          <div className='Folder-Sidebar-Buttons w-[80%] flex flex-col gap-2 mt-8 m-auto'>
            <button className={btnStyleClass}>Create New File</button>
            <button className={btnStyleClass} >Create New Folder</button>
            <button className={btnStyleClass}>Create New Album</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Folders