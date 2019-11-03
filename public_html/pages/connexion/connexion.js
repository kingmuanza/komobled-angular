console.log(app);

app.controller('ConnexionController', function ($scope, database, $routeParams, $timeout, storage) {
    
    
    window.scrollTo(0, 0);


    console.log("Administration");

//    var isAdmin = localStorage.getItem("EnediartAdmin");
//    if(isAdmin){
//        
//    }else{
//        window.location.href="#!connexion"
//    }

    console.log("Administration");
    var controller = this;

    controller.login = ""
    controller.passe = ""
    controller.message = ""

    controller.connexion = function () {
        console.log("controller.login")
        console.log(controller.login)
        console.log("controller.passe")
        console.log(controller.passe)
        firebase.auth().signInWithEmailAndPassword(controller.login, controller.passe).then(function (e) {
            console.log("resultat")
            console.log(e.user)
            database.getDocumentById("utilisateurs", e.user.uid).then((utilisateur) => {
                console.log("utilisateur")
                console.log(utilisateur)
                localStorage.setItem("KOMOBLEDUser", JSON.stringify(utilisateur));
            })
            window.location.href = "#!/";
        }).catch(function (error) {
            console.log(error)
        });
    }

    controller.inscription = function () {

        console.log("controller.nom")
        console.log(controller.nom)
        console.log("controller.email")
        console.log(controller.email)

        console.log("controller.datenaiss")
        console.log(controller.datenaiss)
        console.log("controller.sexe")
        console.log(controller.sexe)

        console.log("controller.password")
        console.log(controller.password)
        console.log("controller.confirmpasse")
        console.log(controller.confirmpasse)
        console.log("controller.cgu")
        console.log(controller.cgu)

        if (controller.nom && controller.email && controller.datenaiss && controller.sexe
                && controller.password && controller.confirmpasse) {
            if (controller.password === controller.confirmpasse) {
                firebase.auth().createUserWithEmailAndPassword(controller.email, controller.password)
                        .then(function (e) {
                            console.log("resultat")
                            console.log(e.user)
                            var utilisateur = {
                                id: e.user.uid,
                                uid: e.user.uid,
                                email: controller.email,
                                nom: controller.nom,
                                datenaiss: controller.datenaiss,
                                sexe: controller.sexe
                            }
                            console.log("utilisateur")
                            console.log(utilisateur)
                            localStorage.setItem("KOMOBLEDUser", JSON.stringify(utilisateur));
                            database.saveDocument("utilisateurs", utilisateur).then((x) => {
                                console.log("Sauvegarde de l'utilisateur")
                                console.log(x);
                                window.location.href = "#!/";
                            })

                        })
                        .catch(function (error) {
                            console.log(error)
                        });
            } else {
                controller.message = "Les mots de passe ne sont pas identiques"
            }

        } else {
            controller.message = "Veuillez remplir le formulaire"
        }



    }


});




