import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div className="Nav">
      <nav>
        <ul>
            <li>
            <NavLink end to="/Detailpcb">
                Detail PCB
            </NavLink>
            </li>
            <li>
            <NavLink to="/LotCode" >
                Check LotCode
            </NavLink>
            </li>
        </ul>
    </nav>
    </div>
  )
}

export default Nav