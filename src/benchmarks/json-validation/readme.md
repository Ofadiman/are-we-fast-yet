# Json Validation

The purpose of this benchmark is to investigate the performance of different data validation libraries.

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

| Task name       | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| --------------- | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| typebox         | 13183464 ± 0.00%           | 12500000                  | 77.02 ± 0.02%        | 80.00               | 64916213 |
| zod             | 168861 ± 0.02%             | 171792                    | 6130.88 ± 0.14%      | 5821.00             | 815545   |
| superstruct     | 46615 ± 0.04%              | 47553                     | 22336.34 ± 0.18%     | 21029.00            | 223851   |
| class-validator | 21990 ± 0.06%              | 22510                     | 46841.39 ± 0.18%     | 44424.00            | 106744   |
| yup             | 13897 ± 0.07%              | 14230                     | 73574.54 ± 0.18%     | 70273.00            | 67959    |

## Conclusion

- `zod` is the fastest library when it comes to validating JavaScript objects. It beats the second fastest library, `superstruct`, by ~3.5 times.
