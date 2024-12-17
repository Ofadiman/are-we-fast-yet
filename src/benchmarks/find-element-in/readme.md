# Find Element In

The purpose of the benchmark is to test how data access speed changes based on data structure used to store the data. I used `array`, `record (object literal)` and `Map` data structures in the benchmark.

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

| Task name                             | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| ------------------------------------- | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| find first element using array.find() | 25365292 ± 0.01%           | 25000000                  | 40.89 ± 0.05%        | 40.00               | 24457973 |
| find first element using Map          | 23625254 ± 0.00%           | 25000001                  | 43.56 ± 0.05%        | 40.00               | 22956262 |
| find last element using Map           | 23414631 ± 0.00%           | 25000001                  | 43.90 ± 0.05%        | 40.00               | 22778831 |
| find first element using record       | 21137186 ± 0.01%           | 20000001                  | 48.75 ± 0.06%        | 50.00               | 20511770 |
| find last element using record        | 20171843 ± 0.00%           | 19999999                  | 50.74 ± 0.06%        | 50.00               | 19709400 |
| find last element using array.find()  | 3762938 ± 0.01%            | 3831418                   | 273.15 ± 0.10%       | 261.00              | 3661023  |
| find first element using for loop     | 3069953 ± 0.01%            | 3115265                   | 332.29 ± 0.05%       | 321.00              | 3009384  |
| find last element using for loop      | 3067834 ± 0.01%            | 3115265                   | 331.86 ± 0.06%       | 321.00              | 3013302  |

## Conclusion

- `Map` is about 10% faster than `record (object literal)` in accessing a semi-random element.
- The `array.find()` method is as fast as `map.get()` at best-case scenario.
- The `for loop` is about 9-10 times slower than `array.find()`.
