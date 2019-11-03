app.controller('AccueilController', function ($scope, database, util) {

    var controller = this;

    controller.mesRestaurants = function () {
        var userString = localStorage.getItem("KOMOBLEDUser");
        if (userString) {
            var user = JSON.parse(userString);
            window.location.href = "#!mesrestaurants/" + user.uid;
        } else {
            window.location.href = "#!connexion";
        }

    }

    controller.nousContacter = function () {
        window.location.href = "#!contactus";

    }

    controller.email = "";
    // Spécialités
    controller.specialites = [];
    controller.getSpecialites = function () {
        database.getCollection('specialites').then((item) => {
            console.log("item");
            console.log(item);
            controller.specialites = item;
            $scope.$apply();
        });
    }
    controller.getSpecialites();
    // Restaurants
    controller.restaurants = [];
    controller.getRestaurants = function () {
//        database.getCollection('restaurants').then((item) => {
//            console.log("item");
//            console.log(item);
//            controller.restaurants = item;
//            $scope.$apply();
//        });
    }
    controller.getRestaurants();
    controller.ouvrirRestaurant = function (restaurant) {
        window.location.href = '#!/restaurant/' + restaurant.id;
    }
    controller.ouvrirSpecialite = function (specialite) {
        window.location.href = '#!/restaurants/' + specialite.id;
    }

    controller.recherche = ""
    controller.resultats = []
    controller.rechercher = function () {
        var liste = []
        console.log(controller.recherche);
        for (var i = 0; i < controller.restaurants.length; i++) {
            var restaurant = controller.restaurants[i];
            if (restaurant.nom.toLowerCase().indexOf(controller.recherche.toLowerCase()) !== -1) {
                liste.push(restaurant);
            }
        }
        controller.resultats = liste;

    }

    // NewsLetter
    controller.titre = "S'inscrire à notre newsletter"
    controller.soustitre = "Nous vous enverrons régulièrement les nouveautés, les restaurants et les spécialités africaines."
    controller.nonInscrit = true;
    controller.ajouterMail = function (email) {
        console.log("saving email !!");
        console.log(email);
        if (email) {
            var newletter = {
                id: database.uid(),
                email: email,
                date: new Date()
            }
            console.log(newletter);
            database.saveDocument('newletters', newletter).then((item) => {
                console.log("item");
                console.log(item);
                controller.titre = "Merci de vous être inscrit à notre Newsletter"
                controller.soustitre = "Nous vous enverrons régulièrement les nouveautés, les restaurants et les spécialités africaines."
                controller.nonInscrit = false;
                $scope.$apply();
            });
        } else {
            controller.soustitre = "Veuillez rentrer votre adresse mail !"
            controller.email = "@"
        }
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



});




