var findCustApp = angular.module("findCustApp", []);

findCustApp.controller("findCustController", ["$scope", function($scope){
  var fc = this;

  fc.init = function(){
    fc.baseLat = 53.3381985; //intercom dublin office latitude
    fc.baseLong = -6.2592576; //intercom dublin office longitude
    fc.rangeKms = 100;
    fc.customers = [];
    fc.nearByCustomers = null;
    fc.mapInit = false;
  };

  fc.getNearByCustomers = function(){
    fc.nearByCustomers = []; //resetting the result variable;
    var fromLat = parseFloat(fc.baseLat);
    var fromLong = parseFloat(fc.baseLong);

    var range = parseFloat(fc.rangeKms);

    if(fc.customers && fc.customers.length > 0){

      $.each(fc.customers, function(index, customer){
        var distanceFromBase = calculateGeoDistance(fromLat, fromLong, parseFloat(customer.latitude), parseFloat(customer.longitude));
        if(distanceFromBase <= range){
          try{
            fc.nearByCustomers.push({
              name: customer.name,
              user_id: customer.user_id,
              distance: parseFloat(Math.round(distanceFromBase * 100) / 100).toFixed(2), //rounding up to two decimal places
              latitude: customer.latitude,
              longitude: customer.longitude
            });
          }catch(e){
            //skipping to next record if we find an invalid customer record
            console.log("Error reading customer data. Object = " + JSON.stringify(customer));
            //TODO: see how can we better log this and show error on screen.
          }
        }
      });
      fc.showListView();
    }else{

    }
  };

  fc.showListView = function(){
    fc.view = "list";
  };

  fc.showMapView = function(){

    fc.view = "map";

    if(!fc.mapInit){
        MapRender.init();
    }else{
      MapRender.resetMarkers();
    }

    if(fc.nearByCustomers){
      customerMapData = fc.nearByCustomers.map(function(customer){ return [customer.name, customer.user_id, customer.latitude, customer.longitude] });
      MapRender.showMarkers(customerMapData);
      fc.mapInit = true;
    }

  };


  //listen for the file uploaded event
  $scope.$on("fileUploaded", function (event, args) {
      $scope.$apply(function () {
          var reader = new FileReader();

          reader.onload = function(event){ //this function will be called when we read data (below line)
            try{
              fc.customers = JSON.parse(event.target.result);
              $scope.$apply(function(){
                fc.invalidJsonError = false; //we need this $apply block to immediately show the error message
                //ideally, the outer $scope.$apply should work, but not sure why its not working.
                //TODO: see if we can avoid nested $apply
              });
            }catch(e){
                console.log(e.message);
                $scope.$apply(function(){
                  fc.invalidJsonError = true;
                  fc.fileName = null;
                  fc.nearByCustomers = null; //this is required to remove the results from a previously uploaded file.
                });
            }
          };

          fc.fileName = args.file.name;
          reader.readAsText(args.file);
      });
  });

  fc.init();

}]);

findCustApp.directive('fileUpload', function () {
    return {
        scope: false,
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                scope.$emit("fileUploaded", { file: event.target.files[0] }); //since we need only single file upload right now
            });
        }
    };
});

findCustApp.directive("customerDetails", function(){
    return {
        restrict: "E",
        replace: true,
        scope: {
            data: "=nearByCustomers"
        },
        template : "<ul class='customer-list'><li ng-repeat = 'customer in data | orderBy : \"user_id\"'><h4>{{customer.name}}</h4><p>distance: {{customer.distance}} kms </p><p>user id: {{customer.user_id}}</p></li></ul>"
    }
});
