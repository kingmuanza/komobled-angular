console.log(app);

app.controller('RestaurantsController', function ($scope, $routeParams, database) {

    console.log("Administration");
    var controller = this;
    controller.restaurants = []
    controller.nom = ""
    controller.departement = "";
    controller.specialites = "";
    controller.pays = "";

    controller.ouvrir = function (restaurant) {
        window.location.href = '#!restaurant/' + restaurant.code_com;
    }
    
    controller.utf8 = function (nom) {
        var name = $('#test').html(nom).text();
        return name
    }
    
    controller.getPhoto = function (restaurant) {
        return 'https://www.komobled.com/commerce/' + restaurant.code_com + '/img/article/profile_XL.png';
    }
    
    controller.getKomobledRestaurants = function () {
        console.log('controller.getKomobledRestaurants');
        $.ajax({
            url: 'https://www.komobled.com/dynamic/func_new.php',
            type: 'GET',
            data: {"getbestcomm": "1"},
            dataType: 'json',
            success: function (response) {
                if (response) {
                    console.log('response');
                    console.log(response);
                    console.log(response.data);
                    controller.restaurants = response.data;
                    
                    $scope.$apply();
                    for (let i = 0; i < response.data.length; i++) {
                        const resto = response.data[i];
                        console.log(resto.name);
                        console.log(controller.utf8(resto.name));
                    }
                }
            },
            error: function (e) {
                console.log(e);
                //called when there is an error
                //console.log(e.message);
            }
        });
    }
    controller.getKomobledRestaurants();
    
    controller.rechercher = function () {
        controller.restaurants = [];
        console.log('controller.getKomobledRestaurants');
        $.ajax({
            url: 'https://www.komobled.com/dynamic/func_new.php',
            type: 'GET',
            data: {"getbestcomm": "1"},
            dataType: 'json',
            success: function (response) {
                if (response) {
                    console.log('response');
                    console.log(response);
                    console.log(response.data);
                    for (let i = 0; i < response.data.length; i++) {
                        const resto = response.data[i];
                        console.log(resto.name);
                        console.log(controller.utf8(resto.name));
                        if(resto.name.indexOf(controller.nom) !== -1) {
                            controller.restaurants.push(resto);
                        }
                    }
                    $scope.$apply();
                }
            },
            error: function (e) {
                console.log(e);
                //called when there is an error
                //console.log(e.message);
            }
        });
    }
    


});




