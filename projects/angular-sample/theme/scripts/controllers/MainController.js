app.controller('MainController', ['$scope', 'itemInfo', function($scope, itemInfo){
	itemInfo.success(function(data){
		$scope.gadgetItems = data;
	})
}]);