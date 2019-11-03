console.log(app);

app.controller('NotationController', function ($scope, database, $routeParams, $timeout, storage) {


    console.log("Administration");
    var controller = this;
    controller.id = $routeParams.id;
    controller.restaurant = {
        isNouveau: false
    }
    controller.message = ""

    controller.notation = {}

    var userString = localStorage.getItem("KOMOBLEDUser");
    if (userString) {
        controller.user = JSON.parse(userString);
        console.log("controller.user");
        console.log(controller.user.nom);
        database.getDocumentById('notations', $routeParams.id + controller.user.uid).then((item) => {
            console.log("item");
            console.log(item);
            if (item) {
                controller.notation = item;
            } else {
                controller.notation = {
                    id: $routeParams.id + controller.user.uid,
                    idrestaurant: $routeParams.id,
                    idutilisateur: controller.user.uid,
                    utilisateur: controller.user.nom,
                    commentaire: '',
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
                    ]
                }
            }
            $scope.$apply();
        });
    } else {
        window.location.href = "#!connexion";
    }



    controller.convertirEnNombre = function (note) {
        return Number(note);
    }

    if ($routeParams.id) {
        database.getDocumentById('restaurants', $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.restaurant = item;
            $scope.$apply();
        });
    }

    controller.noter = function (point, n) {
        var note = controller.convertirEnNombre(point.note) + n;
        console.log("n")
        console.log(n)
        console.log("note")
        console.log(note)
        point.note = note + 1;
    }

    controller.noter2 = function (point, $index) {
        point.note = $index;
    }

    controller.formatDateDay = database.formatDateDay;

    controller.verifier = function (notation) {
        var points = notation.points
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            if (point.note > 0) {
                return true
            }
        }
        return false;
    }

    controller.enregistrer = function (notation) {
        if (notation.commentaire) {
            if (controller.verifier(notation)) {
                console.log(notation)
                notation['date'] = new Date();
                notation['utilisateur'] = controller.user.nom;
                database.saveDocument('notations', notation).then((item) => {
                    console.log("item");
                    console.log(item);
                    window.location.href = "#!restaurant/" + $routeParams.id;
                });
            } else {
                controller.message = "Veuillez remplir les aussi notations"
            }
        } else {
            controller.message = "Veuillez entrer un commentaire"
        }


    }

});




