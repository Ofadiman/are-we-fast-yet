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

| Task name          | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples  |
| ------------------ | -------------------------- | ------------------------- | -------------------- | ------------------- | -------- |
| typebox (compiled) | 13043079 ± 0.00%           | 12500000                  | 78.57 ± 1.85%        | 80.00               | 63638680 |
| zod                | 161446 ± 0.01%             | 163345                    | 6357.90 ± 0.12%      | 6122.00             | 786424   |
| superstruct        | 46678 ± 0.04%              | 47621                     | 22176.65 ± 0.16%     | 20999.00            | 225463   |
| typebox (parse)    | 38296 ± 0.02%              | 38671                     | 26309.44 ± 0.07%     | 25859.00            | 190046   |
| class-validator    | 22384 ± 0.05%              | 22793                     | 45567.78 ± 0.14%     | 43873.00            | 109727   |
| yup                | 14162 ± 0.06%              | 14442                     | 71587.69 ± 0.13%     | 69241.00            | 69845    |

## Conclusion

- Compiled `typebox` schema is ~80 times faster than `zod`.
- Raw `typebox` schema is ~340 times slower than compiled `typebox` schema.
