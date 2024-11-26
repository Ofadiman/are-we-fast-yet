# String Types

This benchmark was designed to test which type of string is the fastest in JavaScript.

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

| Task name    | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| ------------ | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| double quote | 26705624 ± 0.01%           | 25000001                  | 38.50 ± 0.04%        | 40.00               | 25975467 |
| backticks    | 26262184 ± 0.01%           | 25000001                  | 39.00 ± 0.04%        | 40.00               | 25641905 |
| single quote | 25196977 ± 0.01%           | 25000000                  | 41.31 ± 0.05%        | 40.00               | 24206527 |

## Conclusion

- It seems that there are no significant differences between different string types in terms of performance.
