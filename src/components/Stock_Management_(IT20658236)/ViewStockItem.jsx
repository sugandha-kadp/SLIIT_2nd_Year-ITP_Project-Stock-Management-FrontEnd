import React, { Component } from 'react'
//import StockItemService from '../services/StockItemService'
import StockItemService from '../../services/StockItemService'
import HeaderComponent from '../Stock_Management_(IT20658236)/HeaderComponent';

 class ViewStockItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
        stockID: this.props.match.params.stockID,
        itemCode:'',
        itemName:'',
        description:'',
        price:'',
        lotQuantity:''
    }
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

updateStockItem(stockID){
    this.props.history.push(`/update-stockitem/${stockID}`)

}

issueStockItem(stockID){

    this.props.history.push(`/issue-stockitem/${stockID}`)

}



componentDidMount(){
  StockItemService.getStockItemById(this.state.stockID).then( (res) =>{
        let stockItem = res.data;
        this.setState({
          itemCode    : stockItem.itemCode,
          itemName    : stockItem.itemName,
          description :stockItem.description,
          price       :stockItem.price,
          lotQuantity :stockItem.lotQuantity
        });
    });
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
            <div id="divView2" >

               {/* <div id='addStock'> */}
                    <div className = "row">
                        <div id='addStock1' className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">View Stock Item </h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> itemCode : </label>
                                        <input  name="itemCode" className="form-control" 
                                            value={this.state.itemCode} disabled/>
                                    </div>

                                    <div className = "form-group">
                                        <label> itemName: </label>
                                        <input  name="itemName" className="form-control" 
                                            value={this.state.itemName} disabled/>
                                    </div>

                                    <div className = "form-group">
                                        <label> description: </label>
                                        <textarea   name="description" className="form-control" 
                                            value={this.state.description} disabled/>
                                    </div>
                                    
                                    <div className = "form-group">
                                        <label> price: </label>
                                        <input  name="price" className="form-control" 
                                            value={this.state.price} disabled/>
                                    </div>
                                    
                                    <div className = "form-group">
                                        <label> lotQuantity: </label>
                                        <input  name="lotQuantity" className="form-control" 
                                            value={this.state.lotQuantity} disabled/>
                                    </div>


                                    <div className = "form-group text-center">
                                    <button style={{marginLeft: "10px"}} onClick = { () => this.issueStockItem(this.state.stockID)} className="btn btn-danger ">Issue Item</button>
                                    <button style={{marginLeft: "50px"}} onClick = { () => this.updateStockItem(this.state.stockID)} className="btn btn-warning">Update Details</button>
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
export default ViewStockItem