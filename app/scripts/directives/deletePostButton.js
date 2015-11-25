"use strict";

/* globals swal */

(function () {

    angular
        .module("webApp.directives")
        .directive("deletePostButton", DeletePostButtonDirective);

    DeletePostButtonDirective.$inject = [];

    function DeletePostButtonDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "/scripts/directives/deletePostButton.html",
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    console.log("$$$ id: ", attrs.postId);
                    swal({
                            title: "Seguro de eliminar el post?",
                            type: "warning",
                            showCancelButton: true,
                            cancelButtonText: "Mejor no",
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "Si!!",
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        },
                        function () {
                            scope.deletePost(attrs.postId).then(function () {
                                swal("Eliminado!", "", "success");
                            }, function(err) {
                                console.log("Exploto algo =( ", err);
                            });
                        });
                });
            }
        };
    }

}());
