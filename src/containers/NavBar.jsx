import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar =()=>{
    return(
      <nav>
        <ul>
          <li><NavLink  activeClassName='is-active' to={`/tasks/`}><i className="fi flaticon-list"></i>Tasks</NavLink></li>
          <li><NavLink  activeClassName='is-active' to={`/documents/`}><i className="fi flaticon-interface"></i>Documents</NavLink></li>
          <li><NavLink  activeClassName='is-active' to={`/team/`}><i className="fi flaticon-people"></i>Team</NavLink></li>
          <li><NavLink  activeClassName='is-active' to={`/links/`}><i className="fi flaticon-chain"></i>Links</NavLink></li>
          <li><NavLink  activeClassName='is-active' to={`/blog/`}><i className="fi flaticon-interface"></i>Blog</NavLink></li>
          <li><NavLink  activeClassName='is-active' to={`/gallery/`}><i className="fi flaticon-multimedia"></i>Gallery</NavLink></li>
        </ul>
      </nav>
    )
}
export default Navbar