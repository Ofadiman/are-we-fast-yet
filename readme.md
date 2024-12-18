# Are We Fast Yet?

No, we are not. A collection of experiments on slow code.

Are you curious if your code is fast enough? Do you wonder if one library is faster than another? Is native code better than a library implemented on top of the language? Now you can check for yourself.

## Available benchmarks

- [Clone Object](src/benchmarks/clone-object/readme.md) - The purpose of this benchmark is to investigate which method of copying objects in Node.js is the fastest.
- [Find Element In](src/benchmarks/find-element-in/readme.md) - The purpose of this benchmark is to investigate which "hash map" implementation is the fastest when it comes to accessing semi-random elements.
- [Id Generators](src/benchmarks/id-generators/readme.md) - The purpose of this benchmark is to investigate the performance of different methods for generating IDs.
- [Json Validation](src/benchmarks/json-validation/readme.md) - The purpose of this benchmark is to investigate the performance of different data validation libraries.
- [String Types](src/benchmarks/string-types/readme.md) - The purpose of this benchmark is to investigate which method of string declaration is the fastest while performing operations on strings.
