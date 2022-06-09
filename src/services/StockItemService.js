import axios from 'axios';

const STOCK_API_BASE_URL = "http://localhost:8080/api/v1/StockItem";
const RECEIVED_STOCK_API_BASE_URL = "http://localhost:8080/api/v1/RecivedStockItem";
const ISSUED_STOCK_API_BASE_URL = "http://localhost:8080/api/v1/IssuedStockItem";

class StockItemService {

    getStockItem(){
        return axios.get(STOCK_API_BASE_URL);
    }

    addStockItem(stockItem){
        return axios.post(STOCK_API_BASE_URL,stockItem)
    }
    getStockItemById(stockID){
        return axios.get(STOCK_API_BASE_URL + '/' + stockID);
    }
    updateStockItem(stockItem, stockID){
        return axios.put(STOCK_API_BASE_URL + '/' + stockID, stockItem);
    }
    addIssuedStockItemToReportTable(issuedStockItem){
        return axios.post(ISSUED_STOCK_API_BASE_URL,issuedStockItem)
    }
    issueStockItem(stockID){
        return axios.delete(STOCK_API_BASE_URL + '/' + stockID);
    }
    
    stockRecivedReport(){
        return axios.get(RECEIVED_STOCK_API_BASE_URL);
    }

    stockIssuedReport(){
        return axios.get(ISSUED_STOCK_API_BASE_URL);
    }
}

export default new StockItemService()