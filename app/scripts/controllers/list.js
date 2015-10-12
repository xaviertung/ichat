'use strict';

/**
 * @ngdoc function
 * @name ichatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ichatApp
 */
angular.module('ichatApp')
  .controller('ListCtrl', ['$scope', function ($scope) {
  }])
  .controller('FriendCtrl', ['$scope', 'CityData', function ($scope, CityData) {
    var vm = $scope.vm = {};
    vm.countries = CityData;
    vm.countryChanged = function(country) {
      // 自动选中所有下级
      _.each(country.provinces, function(province) {
        province.checked = country.checked;
        _.each(province.cities, function(city) {
          city.checked = country.checked;
        });
      });
    };
    vm.provinceChanged = function(province, country) {
      // 自动选中所有下级
      _.each(province.cities, function(city) {
        city.checked = province.checked;
      });
      // 如果有任何一个子节点被选中，则让上级节点也选中
      // 注意！checkbox的ng-model只能绑定到逻辑型值，所以不能直接把findWhere的结果赋值过去
      country.checked = !!_.findWhere(country.provinces, {checked: true})
    };
    vm.cityChanged = function(city, province, country) {
      // 如果有任何一个子节点被选中，则让上级节点也选中
      // 注意！checkbox的ng-model只能绑定到逻辑型值，所以不能直接把findWhere的结果赋值过去
      province.checked = !!_.findWhere(province.cities, {checked: true});
      country.checked = !!_.findWhere(country.provinces, {checked: true});
    };
    vm.isIntermediateCountry = function(country) {
      // 是否有任何被选中的节点
      var hasChecked = _.find(country.provinces, function(province) {
        return province.checked && _.findWhere(province.cities, {checked: true});
      });
      // 是否有任何没有选中的节点
      var hasNoChecked = _.find(country.provinces, function(province) {
        return !province.checked || _.findWhere(province.cities, {checked: false});
      });
      // 如果同时有选中状态和非选中的节点，则为中间状态
      return hasChecked && hasNoChecked;
    };
    vm.isIntermediateProvince = function(province) {
      var hasChecked = _.findWhere(province.cities, {checked: true});
      var hasNoChecked = _.findWhere(province.cities, {checked: false});
      return hasChecked && hasNoChecked;
    };
  }])
  .controller('ChatCtrl', ['$scope', function($scope) {
    //$scope.config = {
    //  initialFrameHeight:100,initialFrameWidth:400
    //};
  }])
  .directive('editor', [function() {
    return {
      restrict: 'A'
      , scope: {
        content: '='
      }
      , link: function(scope, element, attrs){

        var editor = new UE.ui.Editor({initialContent: scope.content,initialFrameHeight:400,initialFrameWidth:500});
        //var editor = new UE.ui.Editor({initialContent: scope.content,toolbars: [
        //  ['fullscreen', 'source', 'undo', 'redo', 'bold']
        //]});
        editor.render(element[0]);

        editor.ready(function(){
          editor.addListener('contentChange', function(){
            scope.content = editor.getContent();
            scope.$root.$$phase || scope.$apply();
          });

          scope.$watch('content', function(newValue){
            editor.setContent(newValue);
          });
        });
      }
    };
  }])
;
