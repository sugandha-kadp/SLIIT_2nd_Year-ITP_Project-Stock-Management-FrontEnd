import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';
import StockItemService from '../../services/StockItemService'
import HeaderComponent from '../Stock_Management_(IT20658236)/HeaderComponent';

class IssuedStockItemReportComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            IssuedStockItems: [],
            currentDateTime: Date().toLocaleString()
        }

    }

    componentDidMount(){
        StockItemService.stockIssuedReport().then((res) => {
            this.setState({ IssuedStockItems: res.data});
        });
    }


    //Filter data Function to filter Searched Item
    filterData(IssuedStockItems,searchKey){
        console.log(searchKey);
        console.log(IssuedStockItems);
            const result = IssuedStockItems.filter((IssuedStockItem) =>
            IssuedStockItem.itemCode.toLowerCase().includes(searchKey) ||
            IssuedStockItem.itemName.toLowerCase().includes(searchKey) ||
            IssuedStockItem.description.toLowerCase().includes(searchKey)||
            IssuedStockItem.itemCode.toUpperCase().includes(searchKey) ||
            IssuedStockItem.itemName.toUpperCase().includes(searchKey) ||
            IssuedStockItem.description.toUpperCase().includes(searchKey) ||
            IssuedStockItem.issuedTo.toUpperCase().includes(searchKey) ||   
            IssuedStockItem.issuedTo.toLowerCase().includes(searchKey) ||
            IssuedStockItem.dateTime.toUpperCase().includes(searchKey) ||   
            IssuedStockItem.dateTime.toLowerCase().includes(searchKey)   
            )
            this.setState({IssuedStockItems:result})
    }

    //Handle Searcher to get User input and send to Filter Function
    handleSearchArea =(e) =>{
      const searchKey = e.target.value;
      StockItemService.stockIssuedReport().then((res) => {
        this.filterData(res.data,searchKey)
    });
    }


    render() {
        return (
            <div>
                <HeaderComponent></HeaderComponent>
                <div ref ={el=>(this.componentRef=el)}>
                <div id='repG'>  
                    <h2 className="text-center mt-4 ">Stock Issued Report</h2>
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
                            documentTitle = 'Issued Stock Report'
                            pageStyle= "print"
                        />
                    </div> 
                    </div> 

                 <div id="repTblbody" className = "row mb-5 ">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th className='text-center'> IssueId </th>
                                    <th className='text-center'> Item Code </th>
                                    <th className='text-center'> Item Name </th>
                                    <th className='text-center'> Description </th>
                                    <th className='text-center'> Price </th>
                                    <th className='text-center'> Lot Quantity </th>
                                    <th className='text-center'> Issued To </th>
                                    <th className='text-center'> Date & Time </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.IssuedStockItems.map(
                                        IssuedStockItem => 
                                        <tr key = {IssuedStockItem.issueID}>
                                            <td className='text-center'> {IssuedStockItem.issueID} </td>  
                                             <td> {IssuedStockItem.itemCode} </td>   
                                             <td> {IssuedStockItem.itemName}</td>
                                             <td> {IssuedStockItem.description}</td>
                                             <td> {IssuedStockItem.price} </td>   
                                             <td className='text-center'> {IssuedStockItem.lotQuantity}</td>
                                             <td> {IssuedStockItem.issuedTo} </td>
                                             <td className='text-center'> {IssuedStockItem.dateTime}</td>
  
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

export default IssuedStockItemReportComponent;