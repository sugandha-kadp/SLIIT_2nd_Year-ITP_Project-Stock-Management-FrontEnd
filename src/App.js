import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListStockItemComponent from './components/Stock_Management_(IT20658236)/ListStockItemComponent';
import HeaderComponent from './components/Stock_Management_(IT20658236)/HeaderComponent';
import FooterComponent from './components/Stock_Management_(IT20658236)/FooterComponent';
import AddStockItemComponnent from './components/Stock_Management_(IT20658236)/AddStockItemComponnent';
import ViewStockItem  from './components/Stock_Management_(IT20658236)/ViewStockItem';
import UpdateStockItemComponnent  from './components/Stock_Management_(IT20658236)/UpdateStockItemComponnent';
import IssueStockItemComponent  from './components/Stock_Management_(IT20658236)/IssueStockItemComponent';
import ReceivedStockItemReportComponent  from './components/Stock_Management_(IT20658236)/ReceivedStockItemReportComponent';
import IssuedStockItemReportComponent  from './components/Stock_Management_(IT20658236)/IssuedStockItemReportComponent';
import CurrentStockItemReportComponent  from './components/Stock_Management_(IT20658236)/CurrentStockItemReportComponent';
import LoginStockManagement  from './components/Stock_Management_(IT20658236)/LoginStockManagement';
import Login from "./components/Login/Login";

// import Sidebar from './components/Stock_Management_(IT20658236)/Sidebar';


function App() {
  return (
    <div>
        <Router>
              {/* <HeaderComponent/> */}
                <div>

                    <Switch> 
                          <Route path="/" exact component={Login} />
                          <Route path = "/StockItems" exact component = {ListStockItemComponent}></Route>
                          <Route path = "/StockItems" component = {ListStockItemComponent}></Route>
                          <Route path = "/add-stockitem" component = {AddStockItemComponnent}></Route>
                          <Route path = "/view-stockitem/:stockID" component = {ViewStockItem}></Route>
                          <Route path = "/update-stockitem/:stockID" component = {UpdateStockItemComponnent}></Route>
                          <Route path = "/issue-stockitem/:stockID" component = {IssueStockItemComponent}></Route>
                          <Route path = "/recived-stock-report" component = {ReceivedStockItemReportComponent}></Route>
                          <Route path = "/issued-stock-report" component = {IssuedStockItemReportComponent}></Route>
                          <Route path = "/current-stock-report" component = {CurrentStockItemReportComponent}></Route>
                          <Route path = "/StockManagement-Login" exact component = {LoginStockManagement}></Route>
                          

                    </Switch>
                  </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
