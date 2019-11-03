console.log(app);

app.controller('TestAdminController', function ($scope, database, $routeParams, $timeout, storage) {


    console.log("Administration");

//    var isAdmin = localStorage.getItem("EnediartAdmin");
//    if(isAdmin){
//        
//    }else{
//        window.location.href="#!connexion"
//    }

    console.log("Test de l'équipe");
    var controller = this;
    controller.id = $routeParams.id;
    controller.restaurant = {
        isNouveau: true
    }
    controller.test = {
        points: [
            {
                libelle: "Le cadre",
                commentaire: "Aucun",
                note: 0
            }, {
                libelle: "La carte",
                commentaire: "Aucun",
                note: 0
            }, {
                libelle: "Le service et le repas",
                commentaire: "Aucun",
                note: 0
            },
            {
                libelle: "Les points divers",
                commentaire: "Aucun",
                note: 0
            },
        ],
        plus: [],
        moins: []
    }
    controller.plus = "Accueil, Qualité de la nourriture"
    controller.moins = "Les portions un peu juste"
    controller.message = ""


    if ($routeParams.id) {
        database.getDocumentById('restaurants', $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.restaurant = item;
            controller.test = controller.restaurant.test;
            $scope.$apply();
        });
    }

    controller.isValide = function (test) {
        return true
    }


    controller.enregistrer = function () {
        controller.restaurant['test'] = controller.test;
        controller.restaurant.test.plus = controller.plus.split(',');
        controller.restaurant.test.moins = controller.moins.split(',');
        console.log(controller.restaurant);
        database.saveDocument('restaurants', controller.restaurant).then((item) => {
            console.log("item");
            console.log(item);
            window.location.href = "#!tests"
        });
    }


    controller.supprimer = function (item) {
        var oui = confirm("Etes vous sûr de vouloir supprimer le test du restaurant : " + item.nom + " " + item.prenom + " ?");
        if (oui) {
            delete item['test'];
            database.saveDocument('restaurants', item).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!tests"
            });
        }
    }
});




