angular.module('myApp', [])
    .controller('myCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.candidates = [];

            $scope.addCandidate = function() {
               
                var newCandidate = { name: $scope.formContent, upvotes: 0 };
                $http.post('/candidates', newCandidate).success(function(data) {
                     console.log("added candidate");
                    $scope.candidates.push(data);
                });
                $scope.formContent = '';
            };

            $scope.incrementUpvotes = function(candidate) {
                $scope.incrementUpvotes = function(candidate) {
                    $http.put('/candidates/' + candidate._id + '/upvote')
                        .success(function(data) {
                            console.log("upvote worked");
                            candidate.upvotes += 1;
                        });
                };
            };

            $scope.getAll = function() {
                return $http.get('/candidates').success(function(data) {
                    angular.copy(data, $scope.candidates);
                });
            };
            $scope.getAll();

            $scope.delete = function(candidate) {
                console.log(candidate._id);
                $http.delete('/candidates/' + candidate._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);
