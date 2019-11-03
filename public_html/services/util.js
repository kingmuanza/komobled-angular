app.factory('util', function () {
    
    var afficherLesNotations = function (notation) {
        var noteHtml = " ";
        var nombreEtoiles = 0;
        var entier = Math.floor(notation);

        for (var compteur_etoile = 0; compteur_etoile < entier; compteur_etoile++) {
            noteHtml = noteHtml + "<i class='fas fa-star'></i>"
            nombreEtoiles++;
        }

        var diff = notation - entier;
        if (diff > 0) {
            noteHtml = noteHtml + "<i class='fas fa-star-half-alt'></i>"
            nombreEtoiles++;
        }
        while (nombreEtoiles < 5) {
            noteHtml = noteHtml + "<i class='far fa-star'></i>"
            nombreEtoiles++;
        }

        return noteHtml;
    }
    
    var util = {
        afficherLesNotations: afficherLesNotations
    }
    
    return util
    
});

