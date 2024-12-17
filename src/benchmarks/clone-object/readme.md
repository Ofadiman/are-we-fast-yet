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
| chatgpt                                                | 829500 ± 0.01%             | 838926                    | 1217.62 ± 0.11%      | 1192.00             | 821276  |
| claude                                                 | 411978 ± 0.02%             | 417537                    | 2478.16 ± 0.24%      | 2395.00             | 403525  |
| lodash.cloneDeep                                       | 181963 ± 0.03%             | 184162                    | 5630.71 ± 1.13%      | 5430.00             | 177598  |
| JSON.stringify + JSON.parse                            | 148656 ± 0.04%             | 151469                    | 6831.96 ± 0.17%      | 6602.00             | 146371  |
| structuredClone                                        | 134234 ± 0.04%             | 136351                    | 7561.11 ± 0.19%      | 7334.00             | 132256  |
| fast-json-stringify + secure-json-parse (from fastify) | 115859 ± 0.04%             | 117841                    | 8783.85 ± 0.34%      | 8486.00             | 113846  |
| ramda.clone                                            | 115008 ± 0.04%             | 116863                    | 8844.03 ± 0.46%      | 8557.00             | 113071  |

## Conclusion

- ChatGPT has created the fastest deep clone function. It is over 50% faster than the version proposed by Claude.
- The fastest, widely-used method of cloning an object is `cloneDeep` function from `lodash` library. It is almost 5 times slower than the version proposed by ChatGPT.
