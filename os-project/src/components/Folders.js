import React from 'react'

function Folders(props) {
  return (
    <>
        {props.open==='true'?<div>Yay!!!</div>:<div>no </div>}
    </>
  )
}

export default Folders