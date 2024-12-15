# Clone Object

The purpose of this benchmark is to investigate which method of copying objects in Node.js is the fastest.

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

| Task name                                              | Throughput average (ops/s) | Throughput median (ops/s) | Latency average (ns) | Latency median (ns) | Samples |
| ------------------------------------------------------ | -------------------------- | ------------------------- | -------------------- | ------------------- | ------- |
| chatgpt                                                | 823338 ± 0.01%             | 831255                    | 1233.12 ± 1.48%      | 1203.00             | 810953  |
| claude                                                 | 538952 ± 0.01%             | 542299                    | 1886.44 ± 0.23%      | 1844.00             | 530100  |
| lodash.cloneDeep                                       | 179212 ± 0.03%             | 180473                    | 5674.47 ± 0.25%      | 5541.00             | 176228  |
| JSON.stringify + JSON.parse                            | 148404 ± 0.02%             | 149633                    | 6786.52 ± 0.15%      | 6683.00             | 147351  |
| structuredClone                                        | 134890 ± 0.02%             | 135796                    | 7464.85 ± 0.17%      | 7364.00             | 133962  |
| ramda.clone                                            | 119754 ± 0.03%             | 120395                    | 8457.79 ± 0.22%      | 8306.00             | 118235  |
| fast-json-stringify + secure-json-parse (from fastify) | 115232 ± 0.03%             | 116727                    | 8792.85 ± 0.24%      | 8567.00             | 113729  |

## Conclusion

- ChatGPT has created the fastest deep clone function. It is over 50% faster than the version proposed by Claude.
- The fastest, widely-used method of cloning an object is `cloneDeep` function from `lodash` library. It is almost 5 times slower than the version proposed by ChatGPT.
