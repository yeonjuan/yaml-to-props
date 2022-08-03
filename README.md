# yaml-to-props

Convert yaml string to properties format string. See [online demo](https://duby.dev/tools/yaml-properties-converter)

## Install

```bash
npm install yaml-to-props
```

```bash
yarn add yaml-to-props
```

## Usage

```js
import yamlToProps from "yaml-to-props";

const input = `
doc1:
    key1: value
    key2:
      key3:
        key4: true
    key5: 5
    key6: null
---
doc2:
    key1:
      key2:
        # comment
        key3:
          - value1
          - value2`;

const output = yamlToProps(input);

output;
// doc1.key1=value
// doc1.key2.key3.key4=true
// doc1.key5=5
// doc1.key6=null
// doc2.key1.key2.key3=value1, value2
```

## License

MIT
