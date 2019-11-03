console.log(app);

app.controller('TestsAdminController', function ($scope, database) {

    console.log("Administration");

//    var isAdmin = localStorage.getItem("EnediartAdmin");
//    if(isAdmin){
//        
//    }else{
//        window.location.href="#!connexion"
//    }

    console.log("Administration");
    var controller = this;
    controller.restaurants = []
    database.getCollection('restaurants').then((items) => {
        var liste = [];
        console.log("items")
        console.log(items);
        for (var i = 0; i < items.length; i++) {
            var item = items[i]
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
        }


        var colonnes = ["photo", "nom", "description", "specialites_liste", "tel", "pays", "ville"]
        database.initDataTable("#table_restaurants", colonnes, liste, "restaurant")
        console.log($('#table_restaurants tbody'))
    });

    console.log($('#table_restaurants tbody'))
    $('#table_restaurants tbody').on('click', 'tr', function () {
        var item = $(this).data("item");
        console.log(item);
        window.location.href = "#!test/" + item.id;
    });

});




