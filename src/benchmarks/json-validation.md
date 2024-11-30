# Json Validation

This benchmark is designed to test which data validation library is the fastest.

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
| zod             | 159350 ± 0.05%             | 163639                    | 6559.12 ± 0.39%      | 6111.00             | 152460  |
| superstruct     | 45715 ± 0.09%              | 46640                     | 22769.28 ± 0.43%     | 21441.00            | 43919   |
| typebox         | 38092 ± 0.06%              | 38552                     | 26487.98 ± 0.20%     | 25939.00            | 37753   |
| class validator | 22131 ± 0.11%              | 22536                     | 46105.01 ± 0.33%     | 44374.00            | 21690   |
| yup             | 13155 ± 0.16%              | 13390                     | 77523.81 ± 0.38%     | 74682.00            | 12900   |

## Conclusion

- Zod is the fastest at validating data. It beats other libraries by at least 350%.
