console.log(app);

app.controller('SpecialiteAdminController', function ($scope, database, $routeParams, $timeout, storage) {


    console.log("Administration");

//    var isAdmin = localStorage.getItem("EnediartAdmin");
//    if(isAdmin){
//        
//    }else{
//        window.location.href="#!connexion"
//    }

    console.log("Administration");
    var controller = this;
    controller.id = $routeParams.id;
    controller.specialite = {
        isNouveau: true
    }
    controller.message = ""

    if ($routeParams.id) {
        database.getDocumentById('specialites', $routeParams.id).then((item) => {
            console.log("item");
            console.log(item);
            controller.specialite = item;
            $scope.$apply();
        });
    }

    controller.isValide = function (specialite) {
        if (specialite) {
            if (specialite.id) {
                if (specialite.nom && specialite.code) {
                    if (specialite.nom.length>2) {
                        return true
                    }
                    controller.message = "Nom trop court"
                    return false
                }
                controller.message = "Aucun nom ou code"
                return false
            }
            controller.message = "Aucun identifiant"
            return false;
        }
        controller.message = "Aucune donnée"
        return true;
    }


    controller.enregistrer = function (specialite) {
        specialite['user'] = "muanza";
        if (specialite.id) {

        } else {
            specialite['id'] = database.uid();
        }
        if(controller.isValide(specialite)){
            controller.saveImageThenSave(specialite);
        }
    }

    controller.saveInformations = function (specialite) {
        database.saveDocument('specialites', specialite).then((item) => {
            console.log("item");
            console.log(item);
            window.location.href = "#!specialites"
        });
    }


    controller.image = ""
    controller.chargement = false;
    controller.saveImageThenSave = function (specialite) {
        if (controller.image) {
            console.log("Saving image");
            controller.chargement = true;
            storage.saveImage(controller.image).then(function (downloadURL) {
                controller.specialite['photo'] = downloadURL;
                controller.chargement = false
                console.log("Image saved");
                $scope.$apply();
                controller.saveInformations(specialite);
            }).catch((error) => {
                console.log('error')
                console.log(error)
                controller.chargement = false
                $scope.$apply();
            })
        } else {
            database.saveDocument('specialites', specialite).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!specialites"
            });
        }

    }

    controller.readImage = function (input) {
        console.log("Read image")

        storage.readInputFile(input).then((logo) => {
            console.log("Image enregistrée dans le cloud")
            $('#logo_competition').attr('src', logo);
            var png = logo.split(',')[1];
            controller.loadingLogo = false;
            controller.image = png;
            //controller.saveImage();
        });
    }

    $("#input_photo").change(function () {
        console.log("L'image a changé !!")
        controller.readImage(this)
    });

    controller.supprimer = function (item) {
        var oui = confirm("Etes vous sûr de vouloir supprimer la spécialite : " + item.nom + " " + item.prenom + " ?");
        if (oui) {

            database.supprimerDocument('specialites', item).then((item) => {
                console.log("item");
                console.log(item);
                window.location.href = "#!specialites"
            });
        }
    }

});




