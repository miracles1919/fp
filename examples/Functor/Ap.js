class Ap extends Functor {
  ap(F) {
    return Ap.of(this.val(F.val));
  }
}

function add(x) {
  return function (y) {
    return x + y;
  };
}

Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
