/* 
 * Protection et destruction
 * Auto réparation
 * Stratège
 * Infatiguable
 * 
 */

app.factory('storage', function () {

    var storage = firebase.storage();
    var storageRef = storage.ref();
    var imagesRef = storageRef.child('komobled');

    var saveImage = function (file) {

        return new Promise(function (resolve, reject) {
            var ref = imagesRef.child(nomImage() + '.png');
            var newMetadata = {
                contentType: 'image/png'
            }

            console.log(ref);
            //console.log(file);
            var uploadTask = ref.putString(file, 'base64');

            uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function (error) {
                // Handle unsuccessful uploads
            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                });
            });

            uploadTask.then(function (snapshot) {
                ref.updateMetadata(newMetadata).then(function (metadata) {
                    snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        resolve(downloadURL);
                    });
                }).catch(function (error) {
                    
                });
            }).catch((error) => {
                console.log(error.message)
            })
        });

    }

    var nomImage = function () {
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

    var readInputFile = function (input) {

        return new Promise(function (resolve, reject) {

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    resolve(e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            } else {
                reject("Aucun fichier")
            }
        });

    }

    var storage = {
        saveImage: saveImage,
        readInputFile: readInputFile
    }

    return storage;

});

