pragma solidity >=0.4.22 <0.6.0;


contract RegisterOrder {

    struct OrderInfo {
        string Date;
        string Location;
        string Time;
        string Driver;
        string Pork;
        string Weight;
    }

    mapping (string => OrderInfo) AllOrders;

    function SetOrderInfo(string memory _OrderID, string memory _Date, string memory _Location, string memory _Time, string memory _Driver, string memory _Pork, string memory _Weight) public {
        AllOrders[_OrderID].Date = _Date;
        AllOrders[_OrderID].Location = _Location;
        AllOrders[_OrderID].Time = _Time;
        AllOrders[_OrderID].Driver = _Driver;
        AllOrders[_OrderID].Pork = _Pork;
        AllOrders[_OrderID].Weight = _Weight;
    }

    function GetOrderInfo(string memory _OrderID) public view returns(string memory getDate, string memory getLocation,string memory getTime, string memory getDriver, string memory getPork, string memory getWeight){
        getDate = AllOrders[_OrderID].Date;
        getLocation = AllOrders[_OrderID].Location;
        getTime = AllOrders[_OrderID].Time;
        getDriver = AllOrders[_OrderID].Driver;
        getPork = AllOrders[_OrderID].Pork;
        getWeight = AllOrders[_OrderID].Weight;

    }
}
