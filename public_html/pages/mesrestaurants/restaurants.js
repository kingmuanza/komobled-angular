console.log(app);

app.controller('RestaurantsAdminController', function ($scope, $routeParams, database) {

    console.log("Administration");

    console.log("Administration");
    var controller = this;
    controller.restaurants = []
    database.getCollection('restaurants').then((items) => {
        var liste = [];
        console.log("items")
        console.log(items);
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
            if (item.user === $routeParams.id) {

                var liste_specialites = ""
                for (var j = 0; j < item.specialites.length; j++) {
                    var spe = item.specialites[j];
                    if (liste_specialites) {
                        liste_specialites = liste_specialites + ", " + spe.nom;
                    } else {
                        liste_specialites = spe.nom;
                    }
                }
                item['specialites_liste'] = liste_specialites;
                liste.push(item)
                controller.backgroundImage = item.photo ;
            }
        }
        var colonnes = ["photo", "nom", "description", "specialites_liste", "tel", "pays", "ville"]
        database.initDataTableNoUser("#table_restaurants", colonnes, liste, "monrestaurant")
        console.log($('#table_restaurants tbody'));
        $scope.$apply();
    });

    console.log($('#table_restaurants tbody'))
    $('#table_restaurants tbody').on('click', 'tr', function () {
        var item = $(this).data("item");
        console.log(item);
        window.location.href = "#!monrestaurant/" + item.id;
    });

});




