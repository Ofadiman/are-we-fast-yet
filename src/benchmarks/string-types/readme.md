# String Types

This benchmark was designed to test which type of string is the fastest in JavaScript.

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

| Task name    | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| ------------ | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| double quote | 26705624 ± 0.01%           | 25000001                  | 38.50 ± 0.04%        | 40.00               | 25975467 |
| backticks    | 26262184 ± 0.01%           | 25000001                  | 39.00 ± 0.04%        | 40.00               | 25641905 |
| single quote | 25196977 ± 0.01%           | 25000000                  | 41.31 ± 0.05%        | 40.00               | 24206527 |

## Conclusion

- It seems that there are no significant differences between different string types in terms of performance.
