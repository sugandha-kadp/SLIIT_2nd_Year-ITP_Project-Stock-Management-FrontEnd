import React, { Component } from 'react'
import swal from 'sweetalert';
import {Link,withRouter} from "react-router-dom";
// import {logo} from "../images/log.png"

class HeaderBeforLoged extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div header class="header">
            <div id='hdLogo'>
                <img alt="Logo"  src={require("../../images/logo.png")} width="110"  height="63" className="d-inline-block align-top" />          
                <a href="#Home" class="logo"> <span>Auto</span>Miraj </a>
            </div>
            <div id='hdNav'>
                <nav class="navbar">
                    <a href="#home">Home</a>
                    <a href="#vehicles">Products</a>
                    <a href="#services">Our Services</a>
                    <a href="#featured">About Us</a>
                    <a href="#featured">Contact Us</a>
                </nav>
            </div>
            </div>
        )
    }
}

export default withRouter(HeaderBeforLoged)
