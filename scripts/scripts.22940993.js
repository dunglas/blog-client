"use strict";angular.module("blogApp",["restangular"]).config(["RestangularProvider",function(a){a.setBaseUrl("https://api-platform-demo-blog-api.herokuapp.com/"),a.setRestangularFields({id:"@id"}),a.setSelfLinkAbsoluteUrl(!1),a.addResponseInterceptor(function(a,b){function c(a){a["@id"]&&(a.href=a["@id"].substring(1))}if(c(a),"getList"===b){var d=a["hydra:member"];return d.metadata={},angular.forEach(a,function(a,b){"hydra:member"!==b&&(d.metadata[b]=a)}),angular.forEach(d,function(a){c(a)}),d}return a})}]),angular.module("blogApp").controller("MainCtrl",["$scope","Restangular",function(a,b){function c(){d.getList().then(function(b){a.posts=b})}var d=b.all("blog_postings"),e=b.all("people");c(),e.getList().then(function(b){a.people=b}),a.newPost={},a.success=!1,a.errorTitle=!1,a.errorDescription=!1,a.createPost=function(b){d.post(a.newPost).then(function(){c(),a.success=!0,a.errorTitle=!1,a.errorDescription=!1,a.newPost={},b.$setPristine()},function(b){a.success=!1,a.errorTitle=b.data["hydra:title"],a.errorDescription=b.data["hydra:description"]})}}]);
