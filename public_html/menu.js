app.controller('MenuController', function ($scope, database) {

    var controller = this;
    
    controller.utilisateur = null ;
    
    controller.mesRestaurants = function() {
        $('.navbar-toggler').click();
        window.location.href="#!/mesrestaurants/"+controller.utilisateur.uid;
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("user.uid")
            console.log(user.uid)
            database.getDocumentById("utilisateurs", user.uid).then((utilisateur) => {
                console.log("utilisateur")
                console.log(utilisateur)
                controller.utilisateur = utilisateur;
                $scope.$apply();
            })
        } else {
            // No user is signed in.
        }
    });

    controller.deconnexion = function () {
        $('.navbar-toggler').click();
        firebase.auth().signOut().then(function () {
            localStorage.removeItem("KOMOBLEDUser");
            window.location.href="#!/connexion"
            
        }, function (error) {
            console.log(error);
        });
    }


})







