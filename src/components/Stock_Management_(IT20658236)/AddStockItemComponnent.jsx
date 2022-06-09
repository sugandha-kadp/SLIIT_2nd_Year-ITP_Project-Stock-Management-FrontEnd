import React, { Component } from 'react'
import StockItemService from '../../services/StockItemService';
import HeaderComponent from '../Stock_Management_(IT20658236)/HeaderComponent';
import swal from 'sweetalert';

export default class AddStockItemComponnent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: {},
            eritemCode: '',
            eritemName: '',
            erdescription: '',
            erprice:'',
            erlotQuantity:'',

            itemCode: '',
            itemName: '',
            description: '',
            price:'',
            lotQuantity:''
        }
        //bind all value change handler 
        this.changeitemCodeHandler = this.changeitemCodeHandler.bind(this);
        this.changeitemNameHandler = this.changeitemNameHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.changepriceHandler = this.changepriceHandler.bind(this);
        this.changelotQuantityHandler = this.changelotQuantityHandler.bind(this);

        this.addStockItem = this.addStockItem.bind(this);
        this.stockRecivedReport = this.stockRecivedReport.bind(this);
        this.stockIssuedReport = this.stockIssuedReport.bind(this);
        this.currentStockReport= this.currentStockReport.bind(this);
    }

    viewStockItem(stockID){
        this.props.history.push(`/view-stockItem/${stockID}`);
    }
    
    addStockItem(){
        this.props.history.push('/add-stockitem');
    }
    
    currentStockReport(){
        this.props.history.push('/current-stock-report');
    }
    
    stockRecivedReport(){
        this.props.history.push('/recived-stock-report');
    }
    
    stockIssuedReport(){
        this.props.history.push('/issued-stock-report');
    }
    
    //Implemnent functions to get Changed value and set those values to this.state in new object
    changeitemCodeHandler= (event) => {
        this.setState({itemCode: event.target.value});
    }
    changeitemNameHandler= (event) => {
        this.setState({itemName: event.target.value});
    }
    changedescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changepriceHandler= (event) => {
        this.setState({price: +event.target.value});
    }
    changelotQuantityHandler= (event) => {
        this.setState({lotQuantity: event.target.value});
    }

    handleSubmit = event => {
           event.preventDefault();

        let errors = this.validateAll();
        if (this.isValid(errors)){

        let stockItem = {itemCode: this.state.itemCode, itemName: this.state.itemName, description: this.state.description, price: "LKR. "+this.state.price +".00", lotQuantity: this.state.lotQuantity};
         console.log('stockItem => ' + JSON.stringify(stockItem));

         //API call with newly created Stock Item Object
        StockItemService.addStockItem(stockItem).then(res =>{
            this.props.history.push('/StockItems');
            swal("Item added !", "New Stock Item successfully added to System ", "success");
         })
        }
        else{
            let s1 ={...this.state};
            s1.errors = errors;
            this.setState(s1);
        }
    }

    isValid = (errors) => {
        let keys = Object.keys(errors);
        let count = keys.reduce((acc,curr) => errors[curr] ? acc+1 : acc,0);

        return count === 0;
    }

    //Implement Validation For All Input Fileds
    validateAll = () => {
        
        let itemCode1 = this.state.itemCode;
        let itemName1 =this.state.itemName;
        let description1 = this.state.description;
        let price1 = this.state.price;
        let lotQuantity1 = this.state.lotQuantity;
        
        let errors = {};

        if (!itemCode1 || itemCode1 ===" " ) 
        {
        this.state.eritemCode ="Item Code is Required";
        console.log(this.state.eritemCode);
        errors.itemCode ="Item Code is Required"; 
        }
        else{
            this.state.eritemCode ="";
        }

        if (!itemName1 || itemName1 ===" ")
        {
        this.state.eritemName ="Item Name is Required";
        errors.itemName ="Item Name is Required";
        }
        else{
            this.state.eritemName ="";
        }

        if (!description1 || description1 === " ")
        {
        this.state.erdescription ="Description is Required";
        errors.description ="Description is Required";
        }
        else{
            this.state.erdescription ="";
        }

        if (!price1 || price1 === " ")
        {
        this.state.erprice ="Price is Required";
        errors.price ="Price is Required";
        }
        else{
            this.state.erprice ="";
        }

        if (!lotQuantity1 || lotQuantity1 === " "){
        this.state.erlotQuantity ="Lot Quantity is Required";
        errors.lotQuantity ="Lot Quantity is Required";
        return errors;
        }
        else{
            this.state.erlotQuantity ="";
        }
        

        return errors;
   
    }

    handleCancel = event => {
        this.props.history.push('/StockItems');
    }

  render() {

    // let {items,errors} = this.state;
    return (
        <div>   
            <HeaderComponent></HeaderComponent>
                <div  id="div1" >
                    <div  id="div4">
                        <div id='sb1'>
                            <img alt=""  src={require("../../images/add.png")} width="85"  height="80" className="d-inline-block align-top" />
                        </div>

                        <div id='sb2'>
                            <button className="button" style={{ verticalAlign: "middle" }} onClick={this.addStockItem}> <span>Add Items</span></button> 
                        </div>

                        <div id='sb3'>
                        <img alt=""  src={require("../../images/report.png")} width="85"  height="80" className="d-inline-block align-top" />
                        </div>

                        <div id='sb4'>
                        <h4 className='text-light'><u>Genarate Reports</u></h4>
                        </div>

                        <div id='sb5'>
                            <button className="button" style={{ verticalAlign: "middle" }} onClick={this.currentStockReport}> <span>Curreent Stock</span></button>
                        </div>
                                
                        <div id='sb6'>
                            <button className="button" style={{ verticalAlign: "middle" }} onClick={this.stockRecivedReport}> <span>Stock Recived</span></button>
                        </div>

                        <div id='sb7'>
                            <button className="button" style={{ verticalAlign: "middle" }} onClick={this.stockIssuedReport}> <span>Stock Issued</span></button>
                        </div>
                        </div>
                </div>
            <br></br>
               <div id='divView2' >
                    <div className = "row">
                        <div id='addStock1' className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Stock Item</h3>
                            <div className = "card-body">
                                
                                <form onSubmit={this.handleSubmit}>
                                    <div className='form-group'>
                                    <label> Item Code: </label>
                                            <input placeholder='Item Code' name='itemCode' className='form-control' 
                                                value={this.state.itemCode} onChange={this.changeitemCodeHandler}/>
                                               <small className='text-danger'>{this.state.eritemCode} </small>
                                    </div>
                                    <div className='form-group'>
                                    <label> Item Name: </label>
                                            <input placeholder='Item Name' name='itemName' className='form-control' 
                                                value={this.state.itemName} onChange={this.changeitemNameHandler}/>
                                                <small className='text-danger'>{this.state.eritemName} </small>
                                    </div>
                                    <div className='form-group'>
                                    <label> Description: </label>
                                            <textarea  placeholder='Description' name='description' className='form-control' 
                                                value={this.state.description} onChange={this.changedescriptionHandler}/>
                                                <small className='text-danger'>{this.state.erdescription} </small>
                                    </div>
                                    <div className='form-group'>
                                    <label> Price: </label>
                                            <input type='number' min="1" placeholder='Price' name='price' className='form-control' 
                                                value={this.state.price} onChange={this.changepriceHandler}/>
                                                <small className='text-danger'>{this.state.erprice} </small>
                                    </div>
                                    <div className='form-group'>
                                    <label> Lot Quantity: </label>
                                            <input type='number' min="1" placeholder='Lot Quantity' name='lotQuantity' className='form-control' 
                                                value={this.state.lotQuantity} onChange={this.changelotQuantityHandler}/>
                                                <small className='text-danger'>{this.state.erlotQuantity} </small>
                                    </div>
                                    {/* Imperlment tw0 butto */}
                                    <div className = "form-group text-center mt-4 ">
                                    <button style={{marginLeft: "10px"}} className="btn btn-success " onClick={this.handleSubmit}>Save</button>
                                    <button style={{marginLeft: "50px"}} className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>                                   
                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>
                </div>

        </div>
    )
  }
}
