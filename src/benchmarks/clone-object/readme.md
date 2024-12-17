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
| chatgpt                                                | 597874 ± 0.00%             | 608642                    | 1703.80 ± 0.54%      | 1643.00             | 5869239 |
| claude                                                 | 423742 ± 0.01%             | 428449                    | 2417.16 ± 0.10%      | 2334.00             | 4137080 |
| lodash.cloneDeep                                       | 165644 ± 0.01%             | 167196                    | 6133.64 ± 0.07%      | 5981.01             | 1630354 |
| JSON.stringify + JSON.parse                            | 146449 ± 0.01%             | 148302                    | 6888.41 ± 0.05%      | 6743.00             | 1451714 |
| structuredClone                                        | 135657 ± 0.01%             | 136351                    | 7418.69 ± 0.05%      | 7334.00             | 1347947 |
| fast-json-stringify + secure-json-parse (from fastify) | 116915 ± 0.01%             | 118540                    | 8667.34 ± 0.26%      | 8436.00             | 1153757 |
| ramda.clone                                            | 112376 ± 0.01%             | 113417                    | 9021.38 ± 0.08%      | 8817.00             | 1108479 |

## Conclusion

- ChatGPT has created the fastest deep clone function. It is over 40% faster than the version proposed by Claude.
- The fastest, widely-used method of cloning an object is `cloneDeep` function from `lodash` library. It is over 3.5 times slower than the version proposed by ChatGPT.
