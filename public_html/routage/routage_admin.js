app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "pages/accueil/accueil.html"
            })
            .when("/specialites", {
                templateUrl: "pages_admin/specialites/specialites.html"
            })
            .when("/specialite", {
                templateUrl: "pages_admin/specialite/specialite.html"
            })
            .when("/specialite/:id", {
                templateUrl: "pages_admin/specialite/specialite.html"
            })
            .when("/restaurants", {
                templateUrl: "pages_admin/restaurants/restaurants.html"
            })
            .when("/restaurant", {
                templateUrl: "pages_admin/restaurant/restaurant.html"
            })
            .when("/restaurant/:id", {
                templateUrl: "pages_admin/restaurant/restaurant.html"
            })
            .when("/tests", {
                templateUrl: "pages_admin/tests/restaurants.html"
            })
            .when("/test/:id", {
                templateUrl: "pages_admin/test/restaurant.html"
            })
            
            
            .otherwise({
                redirectTo: '/'
            });
});



