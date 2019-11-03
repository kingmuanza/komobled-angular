console.log(app);

app.controller('RestaurantController', function ($scope, database, $routeParams, $timeout, storage) {


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
    controller.restaurant = {
        isNouveau: true
    }
    controller.message = ""

    controller.utf8 = function (nom) {
        console.log(nom);
        var name = nom.replace(new RegExp('</br>', 'g'), '...');
        console.log(name);
        name = $('#test').html(name).text();
        console.log(name);
        return name;
    }
    controller.utf82 = function (nom) {
        // console.log(nom);
        var name = nom.replace(new RegExp('</br>', 'g'), '123');
        // console.log(name);
        name = $('#test').html(name).text();
        // console.log(name);
        name = name.replace(new RegExp('123', 'g'), ' ');
        // console.log(name);
        return name;
    }


    controller.getPhoto = function (restaurant) {
        return 'https://www.komobled.com/commerce/' + restaurant.code_com + '/img/article/profile_XL.png';
    }

    controller.photos = [];
    controller.formatPhoto = function (code, nom) {
        return "https://www.komobled.com/commerce/" + code + "/img/gallery/" + nom;
    }
    controller.getPhotos = function (code) {
        console.log('getPhotos');
        $.ajax({
            url: 'https://www.komobled.com/dynamic/func_new.php',
            type: 'GET',
            data: {"getallfiles": '../commerce/' + code + '/img/gallery/'},
            dataType: 'json',
            success: function (response) {
                if (response) {
                    console.log('response getPhotosgetPhotosgetPhotos');
                    console.log(response);
                    console.log(response.data);
                    if (response.data.length > 2) {
                        for (var i = 2; i < response.data.length; i++) {
                            var photo = response.data[i];
                            console.log(photo);
                            console.log(photo[Object.keys(photo)[0]]);
                            var nom = photo[Object.keys(photo)[0]];
                            var lien = controller.formatPhoto(code, nom);
                            if (nom.indexOf(' ') === -1) {
                                controller.photos.push(lien);
                            }
                        }
                        console.log(controller.photos);
                    }
                }
            },
            error: function (e) {
                console.log('Yaa une erreur getPhotosgetPhotosgetPhotos');
                console.log(e);
                //called when there is an error
                //console.log(e.message);
            }
        });
    }


    controller.getKomobledRestaurant = function (id) {
        console.log('controller.getKomobledRestaurant');
        $.ajax({
            url: 'https://www.komobled.com/dynamic/func_new.php',
            type: 'GET',
            data: {"getcomm": id},
            dataType: 'json',
            success: function (response) {
                if (response) {
                    console.log('response');
                    console.log(response);
                    controller.restaurant = response;

                    controller.getPhotos(id);
                    controller.getComments(response.id);


                    var s = controller.restaurant.description;
                    s = s.replace(/\s{2,}/g, ' ');
                    console.log("s");
                    console.log(s);
                    s = s.replace(new RegExp('</br>', 'g'), '&lt;br&gt;');
                    console.log("s");
                    console.log(s);
                    $('#resto_description').html(controller.utf8(s));
                    $scope.$apply();
//                    const resto = response.data[i];
//                    if (resto.id === id) {
//                        controller.restaurant = resto;
//                        controller.getImages(resto);
//                        console.log();
//                        var s = controller.restaurant.description;
//                        s = s.replace(/\s{2,}/g, ' ');
//                        console.log("s");
//                        console.log(s);
//                        s = s.replace(new RegExp('</br>', 'g'), '&lt;br&gt;');
//                        console.log("s");
//                        console.log(s);
//                        $('#resto_description').html(controller.utf8(s));
//                    }

                }
            },
            error: function (e) {
                console.log('Yaa une erreur');
                console.log(e);
                //called when there is an error
                //console.log(e.message);
            }
        });
    }

    controller.getImages = function (restaurant) {
        console.log('getImages');
        console.log('getImages');
        console.log('getImages');
        return 'https://www.komobled.com/commerce/' + restaurant.code_com + '/img/gallery/';
    }


    controller.notations = [];
    controller.cat1 = 0;
    controller.cat2 = 0;
    controller.cat3 = 0;
    controller.cat4 = 0;
    controller.cat5 = 0;
    controller.note_usr_avg = 0;
    controller.getComments = function (id) {
        console.log('controller.getComments');
        $.ajax({
            url: 'https://www.komobled.com/dynamic/func_new.php',
            type: 'GET',
            data: {"getallcomments": id},
            dataType: 'json',
            success: function (response) {
                if (response && response.data) {
//                    console.log('commentairees alaaoaoaoaors');
//                    console.log(response);
//                    console.log(response.data);
                    controller.notations = response.data;
                    let cat1 = 0;
                    let cat2 = 0;
                    let cat3 = 0;
                    let cat4 = 0;
                    let cat5 = 0;
                    for (let i = 0; i < controller.notations.length; i++) {
                        const note = controller.notations[i];
//                        console.log('note');
//                        console.log(note);
//                        console.log(i);
                        cat1 += Number(note.note_cat1);
                        cat2 += Number(note.note_cat2);
                        cat3 += Number(note.note_cat3);
                        cat4 += Number(note.note_cat4);
                        cat5 += Number(note.note_cat5);
                    }
                    //console.log('controller.cat1');
                    controller.cat1 = Math.floor(cat1 / controller.notations.length);
                    //console.log(controller.cat1);
                    controller.cat2 = Math.floor(cat2 / controller.notations.length);
                    //console.log(controller.cat2);
                    controller.cat5 = Math.floor(cat5 / controller.notations.length);
                    //console.log(controller.cat3);
                    controller.cat3 = Math.floor(cat3 / controller.notations.length);
                    //console.log(controller.cat4);
                    controller.cat4 = Math.floor(cat4 / controller.notations.length);
                    //console.log(controller.cat5);
//                    console.log('controller.notations.length');
//                    console.log(controller.notations.length);
                    controller.note_usr_avg = (controller.cat1 + controller.cat2 + controller.cat3 + controller.cat4 + controller.cat5) / 5;
                    $scope.$apply();
                }
            },
            error: function (e) {
                console.log(e);
                //called when there is an error
                //console.log(e.message);
            }
        });
    }

    if ($routeParams.id) {
        console.log('Miajjdkdkd');
        console.log($routeParams.id);
        controller.getKomobledRestaurant($routeParams.id);
        // controller.getComments($routeParams.id);
    }


});




