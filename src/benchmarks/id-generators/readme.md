# Id Generators

The purpose of this benchmark is to investigate the performance of different methods for generating IDs.

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
| integer-based class              | 21604356 ± 0.00%           | 19999661                  | 50.36 ± 0.32%        | 50.00               | 39714712 |
| integer-based generator function | 17676340 ± 0.00%           | 16666798                  | 57.79 ± 0.03%        | 60.00               | 34609109 |
| randomUUID                       | 13488720 ± 0.00%           | 14285320                  | 87.49 ± 1.16%        | 70.00               | 22861001 |
| uuid v4                          | 6610604 ± 0.01%            | 6666719                   | 170.46 ± 0.23%       | 150.00              | 11732806 |
| uuid v7                          | 5458876 ± 0.02%            | 5848012                   | 262.02 ± 0.10%       | 171.00              | 7633042  |

## Conclusion

- Generating integer-based ids is ~60% faster than generating of uuids.
- Generating integer-based ids using a class-based factory is ~20% faster than a generator function.
- The `randomUUID` function available in Node.js is ~100% faster than the `v4` function available in the `uuid` package.
- Generating uuid v4 is ~20% faster than generating uuid v7.
