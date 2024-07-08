import React, { ReactNode } from 'react'
import "./style.css"


type PropsType = {
    children: ReactNode;
}

function ContainerComponent(props: PropsType) {
  return (
    <div className='container'>
        { props.children }
    </div>
  )
}

export default ContainerComponent