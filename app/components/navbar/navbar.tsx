import { useState } from "react";
import "./navbar.css";
import axios from "axios";


export default function Navbar() {

  
    return (
        <nav className="nav">
                <img className='logo' src="./logo2.png"/>
            <div className="link_container">
                <a href="#">Logo</a>
                <a href="#">Products</a>
                <a href="#">About</a>
                <a href="#">Support</a>
            </div>

        </nav>
    )
}