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

| Task name       | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples |
| --------------- | -------------------------- | ------------------------- | -------------------- | ------------------- | ------- |
| zod             | 161282 ± 0.01%             | 163345                    | 6371.82 ± 0.09%      | 6122.00             | 1569411 |
| superstruct     | 46669 ± 0.03%              | 47461                     | 22269.60 ± 0.13%     | 21070.00            | 449043  |
| typebox         | 36648 ± 0.02%              | 37118                     | 27563.74 ± 0.08%     | 26941.00            | 362796  |
| class-validator | 21137 ± 0.05%              | 21889                     | 48971.65 ± 0.14%     | 45686.00            | 204201  |
| yup             | 13709 ± 0.05%              | 14009                     | 74054.57 ± 0.10%     | 71385.00            | 135036  |

## Conclusion

- `zod` is the fastest library when it comes to validating JavaScript objects. It beats the second fastest library, `superstruct`, by ~3.5 times.
