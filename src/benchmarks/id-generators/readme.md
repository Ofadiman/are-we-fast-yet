# Id Generators

The goal of this benchmark is to check the performance of different methods for generating IDs in JavaScript.

## Hardware

- `Ryzen 9 5950X 16-Core Processor`
- `NVIDIA GeForce RTX 3070 Ti`
- `B550 AORUS ELITE V2 Motherboard`
- `ADATA SX8200PNP SSD Drive, 1.02 TB`
- `62.73 GiB RAM`

## Environment

- `node@22.11.0`
- `npm@10.9.0`
- `tsx@4.19.2`
- `ubuntu@24.04`

## Results

| Task name                        | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| -------------------------------- | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| integer-based class              | 25557364 ± 0.00%           | 25000001                  | 39.71 ± 0.03%        | 40.00               | 25180644 |
| integer-based generator function | 20037755 ± 0.00%           | 20000001                  | 50.74 ± 0.04%        | 50.00               | 19710169 |
| randomUUID                       | 14887590 ± 0.01%           | 14285714                  | 80.80 ± 0.12%        | 70.00               | 12376572 |
| uuid v4                          | 6807856 ± 0.01%            | 7092199                   | 172.11 ± 0.58%       | 141.00              | 5810137  |
| uuid v7                          | 5562253 ± 0.02%            | 5882353                   | 273.08 ± 0.69%       | 170.00              | 3661956  |

## Conclusion

- Generation of integer-based ids is ~70% faster than the generation of uuids.
- Generator functions are ~20% slower than simpler solutions using classes.
- The `randomUUID` function available in Node.js is ~120% faster than the `v4` function available in the `uuid` package.
- Generating uuid v4 is ~20% faster than generating uuid v7.
