class IdFactory {
  current = 0;

  next() {
    this.current += 1;
    return this.current;
  }
}

export const idFactory = new IdFactory();
