'use strict';

/**
 * @ngdoc function
 * @name ichatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ichatApp
 */
angular.module('ichatApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.stage = "chat-list";
    $scope.switchStage = function (currentStage){
      $scope.stage = currentStage;
      //angular.copy(currentStage, $scope.stage);
    };
  }]);
