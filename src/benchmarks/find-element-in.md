# Find Element In

The purpose of the benchmark is to test how data access speed changes based on data structure used to store the data. I used `array`, `record (object literal)` and `Map` data structures in the benchmark.

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

| Task name                             | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| ------------------------------------- | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| find first element using array.find() | 25177828 ± 0.00%           | 25000000                  | 40.27 ± 0.04%        | 40.00               | 24831807 |
| find last element using Map           | 23593796 ± 0.00%           | 25000001                  | 43.12 ± 0.03%        | 40.00               | 23189292 |
| find first element using Map          | 23417487 ± 0.00%           | 25000001                  | 43.52 ± 0.03%        | 40.00               | 22979353 |
| find first element using record       | 22689650 ± 0.00%           | 24999998                  | 44.94 ± 0.03%        | 40.00               | 22252409 |
| find last element using record        | 21876149 ± 0.01%           | 20000002                  | 46.70 ± 0.03%        | 50.00               | 21415266 |
| find last element using array.find()  | 3811733 ± 0.00%            | 3831418                   | 264.05 ± 0.04%       | 261.00              | 3787129  |
| find first element using for loop     | 3140893 ± 0.01%            | 3125000                   | 321.07 ± 0.03%       | 320.00              | 3114544  |
| find last element using for loop      | 3097677 ± 0.01%            | 3115265                   | 326.43 ± 0.03%       | 321.00              | 3063456  |

## Conclusion

- `Map` is about 10% faster than `record (object literal)` in accessing a semi-random element.
- The `array.find()` method is as fast as `map.get()` at best-case scenario.
- The `for loop` is about 9-10 times slower than `array.find()`.
