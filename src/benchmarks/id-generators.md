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
| integer-based class              | 25532483 ± 0.00%           | 25000001                  | 39.75 ± 0.04%        | 40.00               | 25159978 |
| integer-based generator function | 19638371 ± 0.00%           | 20000001                  | 51.66 ± 0.06%        | 50.00               | 19357361 |
| randomUUID                       | 15076758 ± 0.01%           | 14285714                  | 79.08 ± 0.11%        | 70.00               | 12645419 |
| uuid v4                          | 6903566 ± 0.01%            | 7142857                   | 169.59 ± 0.61%       | 140.00              | 5896638  |
| uuid v7                          | 5763437 ± 0.02%            | 6211180                   | 264.28 ± 0.65%       | 161.00              | 3783804  |

## Conclusion

- Generation of integer-based ids is ~70% faster than the generation of uuids.
- Generator functions are ~20% slower than simpler solutions using classes.
- The `randomUUID` function available in Node.js is ~120% faster than the `v4` function available in the `uuid` package.
- Generating uuid v4 is ~20% faster than generating uuid v7.
