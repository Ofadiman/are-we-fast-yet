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
| backticks    | 26351477 ± 0.01%           | 25000001                  | 38.78 ± 0.03%        | 40.00               | 25786259 |
| double quote | 25891548 ± 0.00%           | 25000001                  | 39.31 ± 0.03%        | 40.00               | 25437357 |
| single quote | 25833052 ± 0.00%           | 25000000                  | 39.32 ± 0.03%        | 40.00               | 25433753 |

## Conclusion

- It seems that there are no significant differences between different string types in terms of performance.
