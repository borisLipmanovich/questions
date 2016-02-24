function questionFactory() {
    return {
        url: 'http://ec2-54-191-206-231.us-west-2.compute.amazonaws.com:8000',
        getList: function ($http, $scope) {
            $http({
                method: 'GET',
                url: this.url + '/questions/',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).
                success(function (data) {
                    $scope.data = data;
                }).
                error(function () {
                    $scope.status = status;
                    console.log('Can not get the questions from the server');
                });
        },
        get: function ($http, $scope, id) {
            return $http({
                method: 'GET',
                url: this.url + '/questions/' + id,
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).
                success(function (data) {
                    $scope.data = data;
                }).
                error(function () {
                    console.log('Can not get the questions from the server');
                });
        },
        add: function ($http, $scope, data) {
            return $http({
                method: 'POST',
                data: data,
                url: this.url + '/questions/',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).
                success(function (data) {
                    $scope.data.push(data);
                    $scope.modal.hide();
                }).
                error(function () {
                    console.log('Can not add the question');
                });
        },
        delete: function ($http, $scope, id) {
            return $http({
                method: 'DELETE',
                url: this.url + '/questions/' + id + '/',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).
                success(function () {
                    $scope.modal.hide();
                }).
                error(function () {
                    console.log('Can not delete the question');
                });
        },
        update: function ($http, $scope, id) {
            return $http({
                method: 'PUT',
                data: $scope.data,
                url: this.url + '/questions/' + id + '/',
                headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).
                success(function () {
                    $scope.modal.hide();
                }).
                error(function () {
                    console.log('Can not update the question');
                });
        }
    }
}