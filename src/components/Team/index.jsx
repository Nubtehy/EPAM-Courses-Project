import React from 'react';
import ava1 from './avatars/1.png'

const TeamItem = (props) =>{
  return(
    <div>
        <div>
          <img src={`/avatars/${props.avatar}`}/>
        </div>
        <div>{props.name},{props.position}</div>
    </div>
  )
}

export  default  TeamItem