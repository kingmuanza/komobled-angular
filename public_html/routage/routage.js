app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "pages/accueil/accueil.html"
            })
            .when("/connexion", {
                templateUrl: "pages/connexion/connexion.html"
            })
            .when("/contactus", {
                templateUrl: "pages/contactus/contactus.html"
            })
            .when("/restaurants", {
                templateUrl: "pages/restaurants/restaurants.html"
            })
            .when("/restaurants/:id", {
                templateUrl: "pages/restaurants/restaurants.html"
            })
            .when("/monrestaurant", {
                templateUrl: "pages/monrestaurant/restaurant.html"
            })
            .when("/monrestaurant/:id", {
                templateUrl: "pages/monrestaurant/restaurant.html"
            })
            .when("/mesrestaurants/:id", {
                templateUrl: "pages/mesrestaurants/restaurants.html"
            })
            .when("/restaurant/:id", {
                templateUrl: "pages/restaurant/restaurant.html"
            })
            .when("/notation/:id", {
                templateUrl: "pages/notation/notation.html"
            })
            
            
            .otherwise({
                redirectTo: '/'
            });
});



