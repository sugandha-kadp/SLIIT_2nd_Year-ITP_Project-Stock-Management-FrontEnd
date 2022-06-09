import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';
import StockItemService from '../../services/StockItemService'
import HeaderComponent from '../Stock_Management_(IT20658236)/HeaderComponent';

 class CurrentStockItemReportComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stockItems: [],
            currentDateTime: Date().toLocaleString()
        }

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
            stockItem.itemName.toLowerCase().includes(searchKey) ||
            stockItem.description.toLowerCase().includes(searchKey)||
            stockItem.itemCode.toUpperCase().includes(searchKey) ||
            stockItem.itemName.toUpperCase().includes(searchKey) ||
            stockItem.description.toUpperCase().includes(searchKey))
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
        <div>
          <HeaderComponent></HeaderComponent>
            <div ref ={el=>(this.componentRef=el)}>
                <div id='repG'>   
                    <h2 className="text-center mt-4 ">Current Stock Report</h2>
                    <br></br>
                    <div className='text-center'>
                        <b>Report Generated Date & Time</b>
                    </div>
                    <div className='text-center'>
                        <p>{ this.state.currentDateTime }</p>
                    </div>
                </div>

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
                        documentTitle = 'Current Stock Report'
                        pageStyle= "print"
                    />
                </div>         

                <div id="repTblbody" className = "row mb-5 ">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className='text-center'> StockID </th>
                                <th className='text-center'> Item Code </th>
                                <th className='text-center'> Item Name </th>
                                <th className='text-center'> Description </th>
                                <th className='text-center'> Price </th>
                                <th className='text-center'> Lot Quantity </th>
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
                                            <td> {stockItem.description}</td>
                                            <td> {stockItem.price} </td>   
                                            <td className='text-center'> {stockItem.lotQuantity}</td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
               </div>
        </div>
   </div>
    )
  }
}
export default CurrentStockItemReportComponent