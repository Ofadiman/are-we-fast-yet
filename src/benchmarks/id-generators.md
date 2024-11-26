# Id Generators

The goal of this benchmark is to check the performance of different methods for generating IDs in JavaScript.

## Hardware

- [CPU] `Ryzen 9 5950X 16-Core Processor`
- [GPU] `NVIDIA GeForce RTX 3070 Ti`
- [Motherboard] `B550 AORUS ELITE V2`
- [RAM] `62.73 GiB`
- [Disk] `ADATA SX8200PNP, 953.87 GiB`

## Environment

- [Node] `v22.11.0`
- [NPM] `10.9.0`
- [tsx] `v4.19.2`
- [OS] `Ubuntu 24.04.1 LTS`

## Results

| Task name                        | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| -------------------------------- | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| integer-based class              | 25498788 ± 0.00%           | 25000001                  | 39.77 ± 0.04%        | 40.00               | 25147647 |
| integer-based generator function | 19918126 ± 0.00%           | 20000001                  | 54.44 ± 12.47%       | 50.00               | 18367583 |
| randomUUID                       | 14566776 ± 0.01%           | 14285714                  | 84.43 ± 0.16%        | 70.00               | 11844217 |
| uuid v4                          | 6657479 ± 0.01%            | 6666667                   | 173.84 ± 0.54%       | 150.00              | 5752531  |
| uuid v7                          | 5835151 ± 0.02%            | 6250000                   | 261.53 ± 0.63%       | 160.00              | 3823705  |

## Conclusion

- Generation of integer-based ids is ~70% faster than the generation of uuids.
- Generator functions are ~20% slower than simpler solutions using classes.
- The `randomUUID` function available in Node.js is ~120% faster than the `v4` function available in the `uuid` package.
- Generating uuid v4 is ~20% faster than generating uuid v7.
