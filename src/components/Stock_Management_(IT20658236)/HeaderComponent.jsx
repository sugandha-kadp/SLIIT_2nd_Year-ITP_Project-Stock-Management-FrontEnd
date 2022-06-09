import React, { Component } from 'react'
import swal from 'sweetalert';
import {Link,withRouter} from "react-router-dom";
// import {logo} from "../images/log.png"

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

        logOutClicked =(event) =>{

          swal({
            title: "Log out ??",
            text: "If you select ok button you will Log Out from the System !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Logged Out Successfully !", {
                icon: "success",
              });

              this.props.history.push('/');
            } else {
             
            }
          });
    }

    render() {
        return (
            <div header class="header">
            <div id='hdLogo'>
                <img alt="Logo"  src={require("../../images/logo.png")} width="110"  height="63" className="d-inline-block align-top" />          
                <a href="/StockItems" class="logo"> <span>Auto</span>Miraj </a>
            </div>
            <div id='hdNav'>
                <nav class="navbar">
                    <a href="#home">Home</a>
                    <a href="#vehicles">Products</a>
                    <a href="#services">About Us</a>
                    <a href="#featured">Contact Us</a>
                    <button className="btnLogOut" onClick= {this.logOutClicked}  style={{ verticalAlign: "middle" }} ><span>Log Out</span></button>
                </nav>
            </div>
            </div>
        )
    }
}

export default withRouter(HeaderComponent)
