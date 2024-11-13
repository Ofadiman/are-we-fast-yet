# Find element in...

The purpose of the benchmark is to test how data access speed changes based on data structure used to store the data. I used `array`, `record (object literal)` and `Map` data structures in the benchmark.

## Hardware

- CPU: `Ryzen 9 5950X 16-Core Processor`
- GPU: `NVIDIA GeForce RTX 3070 Ti`
- Motherboard: `B550 AORUS ELITE V2`
- RAM: `62.73 GiB`
- Disk: `ADATA SX8200PNP, 953.87 GiB`

## Results

<!-- prettier-ignore-start -->
┌─────────┬─────────────────────────────────────────┬────────────────────────────┬───────────────────────────┬──────────────────────┬─────────────────────┬──────────┐
│ (index) │ Task name                               │ Throughput average (ops/s) │ Throughput median (ops/s) │ Latency average (ns) │ Latency median (ns) │ Samples  │
├─────────┼─────────────────────────────────────────┼────────────────────────────┼───────────────────────────┼──────────────────────┼─────────────────────┼──────────┤
│ 0       │ 'find last element using Map'           │ '31073286 ± 0.00%'         │ '33333322'                │ '32.90 ± 0.03%'      │ '30.00'             │ 30391358 │
│ 1       │ 'find first element using Map'          │ '30700563 ± 0.00%'         │ '33333330'                │ '33.36 ± 0.03%'      │ '30.00'             │ 29979730 │
│ 2       │ 'find first element using array.find()' │ '30141494 ± 0.01%'         │ '33333332'                │ '34.15 ± 0.04%'      │ '30.00'             │ 29282874 │
│ 3       │ 'find first element using record'       │ '27541414 ± 0.01%'         │ '25000001'                │ '37.45 ± 0.04%'      │ '40.00'             │ 26703519 │
│ 4       │ 'find last element using record'        │ '26860926 ± 0.01%'         │ '25000001'                │ '38.87 ± 0.05%'      │ '40.00'             │ 25725892 │
│ 5       │ 'find last element using array.find()'  │ '3548639 ± 0.01%'          │ '3571429'                 │ '284.92 ± 0.04%'     │ '280.00'            │ 3509704  │
│ 6       │ 'find first element using for loop'     │ '3062242 ± 0.01%'          │ '3115265'                 │ '329.47 ± 0.03%'     │ '321.00'            │ 3035152  │
│ 7       │ 'find last element using for loop'      │ '3016909 ± 0.01%'          │ '3030303'                 │ '334.71 ± 0.06%'     │ '330.00'            │ 2987683  │
└─────────┴─────────────────────────────────────────┴────────────────────────────┴───────────────────────────┴──────────────────────┴─────────────────────┴──────────┘
<!-- prettier-ignore-end -->

## Conclusion

- `Map` is about 10% faster than `record (object literal)` in accessing a semi-random element.
- The `array.find()` method is as fast as `map.get()` at best-case scenario.
- The `for loop` is about 9-10 times slower than `array.find()`.
