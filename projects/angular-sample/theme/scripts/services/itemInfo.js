app.factory('itemInfo',['$http', function($http){
	return $http.get('theme/scripts/data/info.json')
	.success(function(data){
		return data;
	})
	.error(function(err){
		return err;
	});
}]);
