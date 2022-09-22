class Monad {
  static of(val) {
    return new Monad(val);
  }

  constructor(val) {
    this.val = val;
  }

  map(f) {
    return new Monad(f(this.val));
  }

  join() {
    return this.val;
  }

  flatMap(f) {
    return this.map(f).join();
  }
}

const a = Monad.of(1)
  .flatMap(() => Monad.of(2))
  .flatMap(() => Monad.of(3));

const b = Monad.of(1)
  .map(() => Monad.of(2))
  .map(() => Monad.of(3));

console.log(a.join());
