var app = angular.module('myApp',['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider

        .when("/index",{

            templateUrl : "index.html"
        })

        .when("/employeelist",{

            templateUrl:'employeelist.html'
        })

        .when("/employeeform",{

            templateUrl:'emloyeeform.html'
        })
        .when("/empEdit",{

            templateUrl:"empEdit.html",
            controller:"empForm"
        });
});


app.service('myService',function ($http) {

    this.mainData = function () {

        return $http.get("MOCK_DATA.JSON");

    };
    this.obj={};
    this.editObject;
    this.isData=false;

});






app.controller("empController", function($scope,myService,$location) {

  if(myService.isData==false){
      myService.mainData().then(function (response) {
          myService.obj = response.data.empContent;

          $scope.myData =  myService.obj;


      });
  }
  else{
      $scope.myData =  myService.obj;

  }









    $scope.addEmp = function () {



        $location.path('/employeeform');


    };


    $scope.editEmp = function (y) {

        console.log("hi");
        myService.editObject = y;



        console.log("hello");
        console.log( myService.editObject);






        $location.path('/empEdit');




    };




    $scope.removeEmp = function (index) {


        $scope.myData.splice(index,1);




    };









});



app.controller("empForm", function($scope,myService,$location) {

    $scope.user={};

    $scope.user = myService.editObject;



    $scope.editBtn = function () {

        myService.isData=true;
        $scope.myService = angular.copy($scope.user);
        console.log($scope.myService);
        $location.path('/employeelist');
        myService.editObject=null;


    }







    $scope.add = function () {
     myService.isData=true;
        $scope.addemployee = $scope.user;




        myService.obj.push($scope.addemployee);

        console.log($scope.addemployee);
        console.log(myService.obj);
        // console.log($scope.myData);
        $location.path('/employeelist');




    };









});


