import React from 'react';
import './styles.scss';


const Modal = (props) =>(
  <div>
    <div className='modal-block'>
      <button onClick={props.hideEditor}><i className="fi flaticon-close"></i></button>
      <h3>{ props.title }</h3>
      { props.children }
    </div>


    <div className='modal-overlay' onClick={props.hideEditor}></div>
  </div>

)


export default Modal