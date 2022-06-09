import React, { Component } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import AuthenticationService from '../Authentication/AuthenticationService';
import AuthenticationDataService from '../Authentication/AuthenticationDataService';
import HeaderBeforLoged from '../Stock_Management_(IT20658236)/HeaderBeforLoged';
import swal from 'sweetalert';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            
            password: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]:event.target.value}
        )
    }

    loginClicked() {
        if(this.state.userId && this.state.password){
            AuthenticationDataService.getUser(this.state.userId)
                .then(
                    response => {
                        if(response.data != null){
                            if(this.state.password === response.data.password){
                                AuthenticationService.successfulLogin(response.data.userId, 'Name', response.data.role)
                                if(response.data.role ==='admin'){
                                    this.props.history.push("/StockItems")
                                }else if(response.data.role ==='Buyer'){
                                    this.props.history.push("/StockItems")
                                }
                                this.setState({showSuccessMsg: true})
                                this.setState({hasLoginFailed: false})
                            }
                            else{
                                this.setState({showSuccessMsg: false})
                                this.setState({hasLoginFailed: true})
                            }
                        }
                        else{
                            swal("Error!", "Please check , User name and password are incorect !. ", "warning");
                            this.setState({showSuccessMsg: false})
                            this.setState({hasLoginFailed: true})
                        }
                    }
                )
        }
        else{
       if(!this.state.userId && !this.state.password){
            swal("Please Enter User name and Password !");
        }
        else if(!this.state.userId || this.state.userId===" "){
            swal("Please Enter User name  !");
        }
        else if(!this.state.password || this.state.password===" "){
            swal("Please Enter Password !");
        }
            console.log("Enter User name and Password")
        }
    }

    
    render() {


        return ( 
            <div >
                <HeaderBeforLoged></HeaderBeforLoged>
                <div id='lgnLf'>
                    <h1>hello</h1>
                <img id='lgnLfIMG'  alt="Image For Login"  src={require("../../images/imgLGN.png")} /> 
                <div id='lgnDescription'>
                    <h1 style={{ fontSize:48}} class="text-center font-weight-normal"> Stock Management</h1>
                    <p  class="text-center font-weight-light">Auto Mirage (Pvt) Ltd Company <br/> Online Stock Manging System <br/> Autorised Persons Only  </p>
                </div>
                </div>

                <div id='lgnRght'>

                    <div id='lgnRght-mini'>

                        <h1 style={{ fontSize:44}} class="ml-5 pt-3 font-weight-normal"> Loging To Stock Management System</h1>
                             <p  class=" ml-5 pl-2 font-weight-normal">Autorised Persons Only ! </p>

                            <div id='tst1'>
                                <div id='lbl' className='text-right mt-1'>
                                    <label style={{ fontSize:20}}> User Name : </label>
                                </div>
                                <div id='input'>
                                    <input placeholder='Enter User Name here' name='userId' className='form-control' value={this.state.userId} onChange={this.handleChange} />
                                    <small className='text-danger'></small>
                                </div>
                            </div>
                            <div id='tst2'>
                                <div id='lbl1' className='text-right pr-2 mt-'>
                                    <label style={{ fontSize:20}}> Password : </label>
                                </div>
                                <div id='input1'>
                                    <input type='Password' placeholder='Enter Password here' name='password' className='form-control' value={this.state.password} onChange={this.handleChange} />
                                    <small className='text-danger'></small>
                                </div>
                            </div>

                        <div id='buttonLogin' class="text-center">
                            <button className="btnLogin" onClick= {this.loginClicked}  style={{ verticalAlign: "middle" }} ><span>Login</span></button>
                        </div>


                    </div>
                </div>

            </div>
         );

    }
}
 
export default Login;