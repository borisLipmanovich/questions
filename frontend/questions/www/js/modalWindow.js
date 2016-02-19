function initModalWindow($ionicModal, $scope) {
  $ionicModal.fromTemplateUrl('/templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal
  });
  $scope.openModal = function () {
    $scope.modal.show()
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
}
