class Either extends Functor {
  static of(left, right) {
    return new Either(left, right);
  }

  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  map(f) {
    return this.right
      ? Either.of(this.left, f(this.right))
      : Either.of(f(this.left), this.right);
  }
}
