# Find Element In

The purpose of this benchmark is to investigate which "hash map" implementation is the fastest when it comes to accessing semi-random elements.

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

| Task name        | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| ---------------- | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| immutable record | 17812978 ± 0.00%           | 16666798                  | 60.54 ± 0.32%        | 60.00               | 33037832 |
| map              | 16935041 ± 0.00%           | 16666798                  | 62.72 ± 0.27%        | 60.00               | 31890243 |
| record           | 15801135 ± 0.00%           | 16666798                  | 67.20 ± 0.28%        | 60.00               | 29760996 |
| immutable map    | 8865441 ± 0.00%            | 9090878                   | 117.48 ± 0.22%       | 110.00              | 17024389 |

## Conclusion

- `Record` data structure from [immutable.js]() library is the fastest in accessing semi-random elements.
- Native `Map` is about 10% faster than `record (object literal)` in accessing a semi-random elements.
