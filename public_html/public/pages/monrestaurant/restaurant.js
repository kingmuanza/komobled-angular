console.log(app);

app.controller('RestaurantAdminController', function ($scope, database, $routeParams, $timeout, storage) {


    console.log("Administration");
    var controller = this;
    controller.id = $routeParams.id;
    controller.restaurant = {
        isNouveau: true
    }
    controller.message = ""

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

    if ($routeParams.id) {
        database.getDocumentById('restaurants', $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.restaurant = item;
            $scope.$apply();
        });
    }


    controller.enregistrer = function (restaurant) {
        var userString = localStorage.getItem("KOMOBLEDUser");
        if (userString) {
            var user = JSON.parse(userString);
            restaurant['user'] = user.uid;
            if (restaurant.id) {

            } else {
                restaurant['id'] = database.uid();
            }

            controller.saveAutreImage(restaurant);
        }

    }

    controller.saveAutreImage = function (restaurant) {
        var photos = [];

        if (restaurant.photos) {
            for (var i = 0; i < restaurant.photos.length; i++) {
                var photo = restaurant.photos[i];
                var png = photo.source.split(',')[1];
                photo.source = png;
                photos.push(photo);
            }
            restaurant.photos = photos
            var x = 0;
            var fin = photos.length;


            //$scope.$apply();
            for (let i = 0, p = Promise.resolve(); i < fin; i++) {
                console.log("Chargement de l'autre image " + i);
                p = p.then(_ => new Promise(resolve => {
                        storage.saveImage(restaurant.photos[i].source).then(function (downloadURL) {
                            photos[i].source = downloadURL;
                            console.log("L'autre image " + i + " url : " + downloadURL);
                            x++;
                            console.log("x")
                            console.log(x)
                            if (x === fin) {
                                console.log("Tout est accompli !!!")
                                restaurant.photos = photos;
                                console.log(restaurant.photos);
                                controller.saveImage(restaurant)
                            }
                            resolve(downloadURL);
                        });

                    }));
            }
        } else {
            controller.saveImage(restaurant)
        }


    }

    controller.image = ""
    controller.chargement = false;
    controller.saveImage = function (restaurant) {
        if (controller.image) {
            console.log("Saving image");
            controller.chargement = true;
            storage.saveImage(controller.image).then(function (downloadURL) {
                controller.restaurant['photo'] = downloadURL;
                controller.chargement = false
                console.log("Image saved");
                $scope.$apply();
                database.saveDocument('restaurants', restaurant).then((item) => {
                    console.log("item");
                    console.log(item);
                    window.location.href = "#!restaurants"
                });
            }).catch((error) => {
                console.log('error')
                console.log(error)
                controller.chargement = false
                $scope.$apply();
            })
        } else {
            database.saveDocument('restaurants', restaurant).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!restaurants"
            });
        }

    }

    controller.readImage = function (input, id) {
        console.log("Read image");
        storage.readInputFile(input).then((logo) => {
            console.log("Image enregistrée dans le cloud");
            if (id) {
                $(id).attr('src', logo);
            }
            var png = logo.split(',')[1];
            controller.loadingLogo = false;
            controller.image = png;
            //controller.saveImage();
        });
    }
    controller.readAutreImage = function (input) {
        console.log("Read autre image");
        storage.readInputFile(input).then((logo) => {

            var png = logo.split(',')[1];
            var photo = {
                id: database.uid(),
                source: logo
            }
            controller.restaurant.photos.push(photo);
            console.log(controller.restaurant.photos);
            $scope.$apply();
        });
    }

    $("#input_photo").change(function () {
        console.log("L'image a changé !!")
        controller.readImage(this, '#logo_competition')
    });
    $("#input_autre_photo").change(function () {
        console.log("L'image a changé !!")
        if (controller.restaurant.photos) {

        } else {
            controller.restaurant.photos = []
        }

        controller.readAutreImage(this)
    });

    controller.supprimer = function (item) {
        var oui = confirm("Etes vous sûr de vouloir supprimer le restaurant : " + item.nom + " " + item.prenom + " ?");
        if (oui) {

            database.supprimerDocument('restaurants', item).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!restaurants"
            });
        }
    }

    controller.ajouterPhoto = function (restaurant) {
        restaurant['photos'] = [];
        console.log(restaurant)
    }

});




