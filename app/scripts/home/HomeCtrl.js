angular.module('myApp.controllers')
    .controller('HomeCtrl',
    function ($scope) {
        $scope.slides = [
            { title: 'Monarch on Milkweed', id: 1, description: 'Photographed at Fullerton Arboretum.', thumb: 'img/picture.jpg', full: 'img/picture.jpg' },
            { title: 'Western Tiger Swallowtail on Butterflybush', id: 2, description: 'Photographed at San Joaquin Wildlife Sanctuary in the butterfly garden.', thumb: 'img/picture.jpg', full: 'img/picture.jpg' },
            { title: 'Gulf Frittilary on Milkweed', id: 3, description: 'Photographed at Fullerton Arboretum.', thumb: 'img/picture.jpg', full: 'img/picture.jpg' },
            { title: 'Giant Swallowtail on Duranta', id: 4, description: 'Photographed at Fullerton Arboretum.', thumb: 'img/picture.jpg', full: 'img/picture.jpg' }
        ];

    });