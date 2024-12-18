function* createIdGenerator() {
  let current = 0;
  while (true) {
    current += 1;
    yield current;
  }
}

export const idGenerator = createIdGenerator();
