/* 
 * Prottection de l'humanité
 * Vibranium
 * La communication ou le stockage et l’accès à des données
 * Internet des objets
 */

app.factory('authentification', function () {
    
    var user = firebase.auth().currentUser;
    
    var getUser = function(){
        if(user){
            return user.email
        }else{
            var u = JSON.parse(localStorage.getItem("kidoleUser"));
            return u.login
        }
    }
    
    var authentification = {
        getUser:getUser
    }
    
    return authentification
    
});

