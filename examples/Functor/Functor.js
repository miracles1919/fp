class Functor {
  static of(val) {
    return new Functor(val);
  }

  constructor(val) {
    this.val = val;
  }

  map(f) {
    return new Functor(f(this.val));
  }
}

Functor.of(2).map((v) => v + 1);
