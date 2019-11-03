const firebaseConfig = {
    apiKey: "AIzaSyBJMNHxEuJiOtOkm2e161H55_TrLd4-U-4",
    authDomain: "adentic-muanza.firebaseapp.com",
    databaseURL: "https://adentic-muanza.firebaseio.com",
    projectId: "adentic-muanza",
    storageBucket: "adentic-muanza.appspot.com",
    messagingSenderId: "550545313924",
    appId: "1:550545313924:web:490571a4c6d1bc42"
};

var app = angular.module("myApp", ["ngRoute"]);
firebase.initializeApp(firebaseConfig);


