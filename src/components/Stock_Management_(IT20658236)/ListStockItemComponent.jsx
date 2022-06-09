import React, { Component } from 'react'
import StockItemService from '../../services/StockItemService'
import '../../App.css';
import HeaderComponent from '../Stock_Management_(IT20658236)/HeaderComponent';

class ListStockItemComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stockItems: []
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

    componentDidMount(){
        StockItemService.getStockItem().then((res) => {
            this.setState({ stockItems: res.data});
        });
    }

    //Filter data Function to filter Searched Item
    filterData(stockItems,searchKey){
        console.log(searchKey);
        console.log(stockItems);
            const result = stockItems.filter((stockItem) =>
            stockItem.itemCode.toLowerCase().includes(searchKey) ||
            stockItem.itemCode.toUpperCase().includes(searchKey) ||
            stockItem.itemName.toUpperCase().includes(searchKey) ||
            stockItem.itemName.toLowerCase().includes(searchKey)  )
            this.setState({stockItems:result})
    }

    //Handle Searcher to get User input and send to Filter Function
    handleSearchArea =(e) =>{
      const searchKey = e.target.value;
      StockItemService.getStockItem().then((res) => {
        this.filterData(res.data,searchKey)
    });
    }



    render() {
        return (
            <div >
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



                    <div id="div2" >
                        <div id='div5'>
                            <h1 className="text-center ">Stock Management</h1>
                        </div>
                        <div id='div6'>
                                <input className='form-control bg-light' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}></input>
                        </div>
                            <div className='col mt-4 mb-5'>
                                <div id="div3" className = "row ">
                                        <table className = "table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className='text-center'> Stock ID </th>
                                                    <th className='text-center'> Item Code </th>
                                                    <th className='text-center'> Item Name </th>
                                                    <th className='text-center'> Price </th>
                                                    <th className='text-center'> Lot Quantity </th>
                                                    <th className='text-center'> View</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.stockItems.map(
                                                        stockItem => 
                                                        <tr key = {stockItem.stockID}>
                                                            <td className='text-center'> {stockItem.stockID} </td>  
                                                            <td> {stockItem.itemCode} </td>   
                                                            <td> {stockItem.itemName}</td>
                                                            <td> {stockItem.price} </td>   
                                                            <td className='text-center'> {stockItem.lotQuantity}</td>
                                                            
                                                            <td>
                                                            <div id='btnView'>
                                                                <button className="buttonView" style={{ verticalAlign: "middle" }} onClick={ () => this.viewStockItem(stockItem.stockID)}><span>View</span></button>
                                                            </div>
                                                            </td>
                                                            
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                </div>
                        </div>
                    </div>

            </div>
        )
    }
}

export default ListStockItemComponent
