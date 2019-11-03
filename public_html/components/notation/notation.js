function NotationComponentController() {
    var ctrl = this;
    ctrl.convertirEnNombre = function (note) {
        return Math.floor(Number(note));
    }
}

app.component('notation', {
  templateUrl: 'components/notation/notation.html',
  controller: NotationComponentController,
  bindings: {
    note: '='
  }
});