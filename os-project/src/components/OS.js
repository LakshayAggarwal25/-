import React,{useState} from 'react'
import Taskbar from './Taskbar'

function OS() {
    return (
    <>
        <div>
        <Taskbar activeApp setActiveApp/>
        </div>
    </>
  )
}

export default OS