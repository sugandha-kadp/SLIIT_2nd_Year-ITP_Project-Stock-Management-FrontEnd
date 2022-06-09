import React, { Component } from 'react'
import StockItemService from '../../services/StockItemService'
import moment from 'moment'
import swal from 'sweetalert';
import HeaderComponent from '../Stock_Management_(IT20658236)/HeaderComponent';


class IssueStockItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            issuStockID: this.props.match.params.stockID,
            issuedItemCode:'',
            issuedItemName:'',
            issuedItemdescription:'',
            issuedItemprice:'',
            issuedItemlotQuantity:'',
            issuedTo:'',
            companyName:'',

            error: {},
            ercompanyName:'',
            
            stockItems: []
        }
        this.addStockItem = this.addStockItem.bind(this);
        this.stockRecivedReport = this.stockRecivedReport.bind(this);
        this.stockIssuedReport = this.stockIssuedReport.bind(this);
        this.currentStockReport= this.currentStockReport.bind(this);

        //bind all fuctions
        this.refreshStock = this.refreshStock.bind(this)
        this.addCompanyNameHandler =this.addCompanyNameHandler.bind(this)
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

    //Implemnent function to get Company name and set that values to this.state in new object
    addCompanyNameHandler =(event) =>{
        this.setState({companyName: event.target.value});
    }

    //Function to Cancle Button
    handleCancel = event => {
        this.props.history.push('/StockItems');
    }
    


    issueStockItem(issuStockID){

        let error = this.validateAll();
            if (this.isValid(error)){

                //Get system data using moment Librrary
                let currentDateTime = moment().format('YYYY-MM-D | h:mm:ss a');
                //define variable to get all issued item data and Send issued Stock Item data to Stock Report Table
                let issuedStockItem = {itemCode: this.state.issuedItemCode, itemName: this.state.issuedItemName, description: this.state.issuedItemdescription, price: this.state.issuedItemprice, lotQuantity: this.state.issuedItemlotQuantity,issuedTo:this.state.companyName,dateTime:currentDateTime};
                console.log('issuedStockItem => ' + JSON.stringify(issuedStockItem));
                //call API
                StockItemService.addIssuedStockItemToReportTable(issuedStockItem)
                //Display Alter Message
                // alert("Item Issed From the Stores To "+ this.state.companyName +"")

                swal("Item Issed!", "Item Issed From the Stores To "+ this.state.companyName +"", "success");
                
                StockItemService.issueStockItem(issuStockID).then( res => {
                    this.setState({stockItems: this.state.stockItems.filter(stockItem => stockItem.stockID !== issuStockID)});
                    this.refreshStock();
                    this.props.history.push('/StockItems');
                });
            }
            else{
                let s1 ={...this.state};
                s1.error = error;
                this.setState(s1);
                swal("Company Name is Required!", "Please Enter Receiver's Company Name to Issue Stock Items !. ", "warning");
            }
    }

    isValid = (error) => {
        let keys = Object.keys(error);
        let count = keys.reduce((acc,curr) => error[curr] ? acc+1 : acc,0);

        return count === 0;
    }

    //Implement Validation For All Input Fileds
    validateAll = () => {
        
        let companyName1 = this.state.companyName;

        let error = {};

        if (!companyName1 || companyName1===" ") 
        {
        this.state.ercompanyName ="Company Name is Required";
        console.log(this.state.ercompanyName);
        error.companyName ="Company Name is Required"; 
        }
        else{
            this.state.eritemCode ="";
        }

        return error;
   
    }
 
    //set Issue Item Code 
    componentDidMount(){
        StockItemService.getStockItem().then((res) => {
            this.setState({ stockItems: res.data});
        });
        //Get issue item details
        StockItemService.getStockItemById(this.state.issuStockID).then( (res) =>{
            let issuStockItem = res.data;
            this.setState({
                issuedItemCode  : issuStockItem.itemCode,
                issuedItemName : issuStockItem.itemName,
                issuedItemdescription : issuStockItem.description,
                issuedItemprice : issuStockItem.price,
                issuedItemlotQuantity : issuStockItem.lotQuantity,

            });
        });
    }
    //function to refresh the web page
    refreshStock(){
        this.props.history.push('/StockItems');
    }

    

    render() {
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
                 <div  id='divView2'>
                    <div className = "row">
                        <div id='addStock1' className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Issue Items</h3>
                            <div className = "card-body">

                                <form>
                                    <div className = "form-group">
                                        <label> itemCode : </label>
                                        <input  name="itemCode" className="form-control" 
                                            value={this.state.issuedItemCode} disabled/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Issued To: </label>
                                        <input className="form-control" name='issuedTo' placeholder='Company Name'
                                        onChange={this.addCompanyNameHandler} />
                                        <small className='text-danger'>{this.state.ercompanyName} </small>
                                    </div>
                                    {/* Imperlment tw0 butto */}

                                </form>
                                    <div className = " text-center mt -10">
                                        <button style={{marginTop: "10px"}} onClick = { () => this.issueStockItem(this.state.issuStockID)} className="btn btn-danger ">Issue Item</button>
                                        <button style={{marginTop: "10px" , marginLeft: "50px"}} className="btn btn-outline-info" onClick={this.handleCancel} >Cancel</button>      
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IssueStockItemComponent
