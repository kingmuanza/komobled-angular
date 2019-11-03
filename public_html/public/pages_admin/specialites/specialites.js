console.log(app);

app.controller('SpecialitesAdminController', function ($scope, database) {
    
    console.log("Administration");
    
//    var isAdmin = localStorage.getItem("EnediartAdmin");
//    if(isAdmin){
//        
//    }else{
//        window.location.href="#!connexion"
//    }
    
    console.log("Spécialités");
    var controller = this ;
    controller.specialites = []
    database.getCollection('specialites').then((items)=>{
        
        console.log("items")
        console.log(items);
        
        var colonnes = ["photo", "code", "nom"]
        database.initDataTable("#table_specialites", colonnes, items, "specialite")
        console.log($('#table_specialites tbody'))
    });
    
    console.log($('#table_specialites tbody'))
    $('#table_specialites tbody').on('click', 'tr', function () {
        var item = $(this).data("item");        
        console.log(item);
        window.location.href="#!specialite/"+item.id;
    });
    
});




