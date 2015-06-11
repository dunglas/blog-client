'use strict';

/**
 * @ngdoc function
 * @name blogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blogApp
 */
angular.module('blogApp')
    .controller('MainCtrl', function ($scope, Restangular) {
        var blogPostingApi = Restangular.all('blog_postings');
        var peopleApi = Restangular.all('people');

        function loadPosts() {
            blogPostingApi.getList().then(function (posts) {
                $scope.posts = posts;
            });
        }

        loadPosts();
        peopleApi.getList().then(function (people) {
            $scope.people = people;
        });

        $scope.newPost = {};
        $scope.success = false;
        $scope.errorTitle = false;
        $scope.errorDescription = false;

        $scope.createPost = function (form) {
            blogPostingApi.post($scope.newPost).then(function () {
                loadPosts();

                $scope.success = true;
                $scope.errorTitle = false;
                $scope.errorDescription = false;

                $scope.newPost = {};
                form.$setPristine();
            }, function (response) {
                $scope.success = false;
                $scope.errorTitle = response.data['hydra:title'];
                $scope.errorDescription = response.data['hydra:description'];
            });
        };
    });
