# String Types

The purpose of this benchmark is to investigate which method of string declaration is the fastest while performing operations on strings.

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
| backticks    | 22121964 ± 0.01%           | 20002642                  | 56.79 ± 18.41%       | 49.99               | 17609779 |
| double quote | 22109993 ± 0.01%           | 20002642                  | 51.49 ± 0.79%        | 49.99               | 19419578 |
| single quote | 21697106 ± 0.01%           | 19999661                  | 50.12 ± 2.25%        | 50.00               | 19952777 |

## Conclusion

- It seems that there are no significant differences between different string types in terms of performance.
