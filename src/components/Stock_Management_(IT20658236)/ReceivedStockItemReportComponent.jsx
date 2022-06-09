import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';
import StockItemService from '../../services/StockItemService'
import HeaderComponent from '../Stock_Management_(IT20658236)/HeaderComponent';

class ReceivedStockItemReportComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            RecivedStockItems: [],
            currentDateTime: Date().toLocaleString()
        }

    }

    componentDidMount(){
        StockItemService.stockRecivedReport().then((res) => {
            this.setState({ RecivedStockItems: res.data});
        });
    }

        //Filter data Function to filter Searched Item
        filterData(RecivedStockItems,searchKey){
            console.log(searchKey);
            console.log(RecivedStockItems);
                const result = RecivedStockItems.filter((RecivedStockItem) =>
                RecivedStockItem.itemCode.toLowerCase().includes(searchKey) ||
                RecivedStockItem.itemName.toLowerCase().includes(searchKey) ||
                RecivedStockItem.description.toLowerCase().includes(searchKey)||
                RecivedStockItem.itemCode.toUpperCase().includes(searchKey) ||
                RecivedStockItem.itemName.toUpperCase().includes(searchKey) ||
                RecivedStockItem.description.toUpperCase().includes(searchKey))
                this.setState({RecivedStockItems:result})
        }
    
        //Handle Searcher to get User input and send to Filter Function
        handleSearchArea =(e) =>{
          const searchKey = e.target.value;
          StockItemService.stockRecivedReport().then((res) => {
            this.filterData(res.data,searchKey)
        });
        }
    

    

    render() {
        return (
            <div>
                <HeaderComponent></HeaderComponent>
                <div ref ={el=>(this.componentRef=el)}>
                <div id='repG'>  
                    <h2 className="text-center mt-4">Stock Received Report</h2>
                        <br></br>
                        <div className='text-center'>
                            <b>Report Generated Date & Time</b>
                        </div>
                        <div className='text-center'>
                            <p>{ this.state.currentDateTime }</p>
                        </div>
                </div>
                <div>
                <div id="repGSearch" className='col-lg-3 mt-2 mb-2 ml-5'>
                    <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}>
                    </input>
                </div>
                    <div className='text-right mb-2 mr-5'>
                    <ReactToPrint
                        trigger={()=>{
                        return <button className="btn btn-danger" > Download Report </button>
                        }}
                        content={()=>this.componentRef}
                        documentTitle = 'Received Stock Report'
                        pageStyle= "print"
                    />
                </div>

                </div>

                 <div id="repTblbody"className = "row mb-5">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th className='text-center'> RecivedID </th>
                                    <th className='text-center'> Item Code </th>
                                    <th className='text-center'> Item Name </th>
                                    <th className='text-center'> Description </th>
                                    <th className='text-center'> Price </th>
                                    <th className='text-center'> Lot Quantity </th>
                                    <th className='text-center'> Date & Time </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.RecivedStockItems.map(
                                        RecivedStockItem => 
                                        <tr key = {RecivedStockItem.recivedID}>
                                            <td className='text-center'> {RecivedStockItem.recivedID} </td>  
                                             <td> {RecivedStockItem.itemCode} </td>   
                                             <td> {RecivedStockItem.itemName}</td>
                                             <td> {RecivedStockItem.description}</td>
                                             <td> {RecivedStockItem.price} </td>   
                                             <td className='text-center'> {RecivedStockItem.lotQuantity}</td>
                                             <td className='text-center'> {RecivedStockItem.dateTime}</td>
  
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
            </div>
        );
    }
}

export default ReceivedStockItemReportComponent
