/* 
 Récupère des informations
 Calcule des équations : calcul complexes
 Participe aux tâches de conception et d'ingénierie
 */

app.factory('database', function () {

    var language = {
        "sProcessing": "Chargement...",
        "sLengthMenu": "Afficher _MENU_ élements",
        "sZeroRecords": "Aucun résultat",
        "sEmptyTable": "Aucune donnée disponible",
        "sInfo": "De _START_ à _END_ sur un total de _TOTAL_ éléments",
        "sInfoEmpty": "De 0 à 0 sur un total de 0 éléments",
        "sInfoFiltered": "",
        "sInfoPostFix": "",
        "sSearch": "Rechercher : ",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Suivant",
            "sPrevious": "Précédent"
        },
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }

    //Récupération de firebase
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);

    // JavaScript Promise pour récupérer les informations dans la base de données
    var getCollection = function (collection) {
        var liste = []
        return new Promise(function (resolve, reject) {
            db.collection(collection).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    liste.push(doc.data())
                });
                resolve(liste);
            }).catch((error) => {
                reject(error)
            })
        });
    }

    var getCollectionLimit = function (collection, limite) {
        var liste = []
        return new Promise(function (resolve, reject) {
            db.collection(collection).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (liste.length < limite) {
                        liste.push(doc.data())
                    }
                });
                resolve(liste);
            }).catch((error) => {
                reject(error)
            })
        });
    }

    var getCollectionWhere = function (collection, attribut, valeur) {
        var liste = []
        return new Promise(function (resolve, reject) {
            db.collection(collection).where(attribut, "==", valeur).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    liste.push(doc.data())
                });
                resolve(liste);
            }).catch((error) => {
                reject(error)
            })
        });
    }
    var getDocumentById = function (collection, id) {
        var data = {

        };
        return new Promise(function (resolve, reject) {
            db.collection(collection).doc(id).get().then((item) => {
                data = item.data();
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    var saveDocument = function (collection, element) {
        return new Promise(function (resolve, reject) {
            db.collection(collection).doc(element.id).set(element).then((item) => {
                console.log(item);
                resolve(item);
            }).catch((error) => {
                reject(error)
            })
        });
    }

    var supprimerDocument = function (collection, element) {
        return new Promise(function (resolve, reject) {
            db.collection(collection).doc(element.id).delete().then((item) => {
                resolve(true);
            }).catch((error) => {
                reject(error)
            })
        });
    }

    var initDataTable = function (id_table, colonnes, data, lienNouveau) {

        var columns = []
        for (var i = 0; i < colonnes.length; i++) {
            if (colonnes[i] === "photo" || colonnes[i] === "src") {
                var libelle = colonnes[i]
                var col = {
                    "render": function (data, type, JsonResultRow, meta) {
                        console.log("JsonResultRow")
                        console.log(JsonResultRow)
                        console.log(meta)
                        return '<img class="mini_image" src="' + JsonResultRow[libelle] + '">';
                    }
                }
            } else {
                var col = {"data": colonnes[i]}
            }
            columns.push(col)
        }
        columns.push({"data": "user"})
        console.log("Init datatable")
        console.log(id_table)
        console.log(columns)
        console.log(data[0])

        var table = $(id_table).DataTable({
            language: language,
            responsive: true,
            order: [[0, "desc"], [1, "asc"]],
            destroy: true,
            data: data,
            dom: 'Bfrtip',
            buttons: [
                {
                    text: 'Nouveau',
                    className: "btn btn-dark",
                    action: function (e, dt, node, config) {
                        window.location.href = "#!" + lienNouveau
                    }
                },
                {
                    text: 'Actualiser',
                    className: "btn btn-dark",
                    action: function (e, dt, node, config) {
                        //controller.getAll(controller.collection);
                    }
                },
                {
                    extend: 'excel',
                    text: 'Exporter Excel',
                    className: 'btn btn-dark'
                },
                {
                    extend: 'pdf',
                    text: 'Exporter PDF',
                    className: 'btn btn-dark'
                }

            ],
            "columns": columns,
            "createdRow": function (row, data, index) {
                $(row).data("item", data)
                console.log(data)
            }
        });

    }
    var initDataTableNoUser = function (id_table, colonnes, data, lienNouveau) {

        var columns = []
        for (var i = 0; i < colonnes.length; i++) {
            if (colonnes[i] === "photo" || colonnes[i] === "src") {
                var libelle = colonnes[i]
                var col = {
                    "render": function (data, type, JsonResultRow, meta) {
                        console.log("JsonResultRow")
                        console.log(JsonResultRow)
                        console.log(meta)
                        return '<img class="mini_image" src="' + JsonResultRow[libelle] + '">';
                    }
                }
            } else {
                var col = {"data": colonnes[i]}
            }
            columns.push(col)
        }
        //olumns.push({"data": "user"})
        console.log("Init datatable")
        console.log(id_table)
        console.log(columns)
        console.log(data[0])

        var table = $(id_table).DataTable({
            language: language,
            responsive: true,
            order: [[0, "desc"], [1, "asc"]],
            destroy: true,
            data: data,
            dom: 'Bfrtip',
            buttons: [
                {
                    text: 'Nouveau',
                    className: "btn btn-dark",
                    action: function (e, dt, node, config) {
                        window.location.href = "#!" + lienNouveau
                    }
                },
                {
                    text: 'Actualiser',
                    className: "btn btn-dark",
                    action: function (e, dt, node, config) {
                        //controller.getAll(controller.collection);
                    }
                }

            ],
            "columns": columns,
            "createdRow": function (row, data, index) {
                $(row).data("item", data)
                console.log(data)
            }
        });

    }

    var formatDateDay = function (timestamp) {
        if (timestamp) {
            if (timestamp.seconds) {
                //console.log(timestamp.seconds);
                var d = new Date(timestamp.seconds * 1000);
                return d.toISOString().split('T')[0];
            }
        }
        return null;

    }
    var timeToDate = function (timestamp) {
        if (timestamp) {
            if (timestamp.seconds) {
                //console.log(timestamp.seconds);
                var d = new Date(timestamp.seconds * 1000);
                return d
            }
        }
        return null;
    }

    var uid = function () {
        var firstPart = (Math.random() * 466560123) | 0;
        var secondPart = (Math.random() * 466560123) | 0;
        var s3 = (Math.random() * 466560123) | 0;
        var s4 = (Math.random() * 466560123) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        s3 = ("000" + s3.toString(36)).slice(-3);
        s4 = ("000" + s4.toString(36)).slice(-3);
        return firstPart + secondPart + s3 + s4
    }


    const database = {
        uid: uid,
        getCollection: getCollection,
        getCollectionWhere: getCollectionWhere,
        getCollectionLimit:getCollectionLimit,
        initDataTable: initDataTable,
        initDataTableNoUser: initDataTableNoUser,
        getDocumentById: getDocumentById,
        formatDateDay: formatDateDay,
        timeToDate: timeToDate,
        saveDocument: saveDocument,
        supprimerDocument: supprimerDocument,
        db: db,
        language: language
    }

    return database;

});


