console.log(app);

app.controller('ContactUsController', function ($scope, database, $routeParams, $timeout, storage) {


    console.log("Contactez nous");
    var controller = this;


    controller.ajouterRestaurant = function () {
        var userString = localStorage.getItem("KOMOBLEDUser");
        if (userString) {
            var user = JSON.parse(userString);
            window.location.href = "#!mesrestaurants/"+user.uid;
        } else {
            window.location.href = "#!connexion";
        }

    }

});




