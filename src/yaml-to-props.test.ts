import { yamlToProps } from "./yaml-to-props";

describe("yamlToProps", () => {
  test("simple string", () => {
    const input = `key: value`;
    const output = `key=value`;

    expect(yamlToProps(input)).toBe(output);
  });

  test("nested string", () => {
    const input1 = `
key1:
    key2: value
`;
    const output1 = "key1.key2=value";

    expect(yamlToProps(input1)).toBe(output1);

    const input2 = `
key1:
    key2:
        key3: value
`;
    const output2 = "key1.key2.key3=value";

    expect(yamlToProps(input2)).toBe(output2);

    const input3 = `
key1:
    key2:
        key3: value
    key4: value
key5: value
`;

    const output3 = `key1.key2.key3=value
key1.key4=value
key5=value`;

    expect(yamlToProps(input3)).toBe(output3);

    const input4 = `
key1:
    key2:
        key3: value
        key4: value
    key5: value
`;

    const output4 = `key1.key2.key3=value
key1.key2.key4=value
key1.key5=value`;

    expect(yamlToProps(input3)).toBe(output3);
  });

  test("array", () => {
    const input1 = `
key1:
    - value1
    - value2
`;
    const output1 = "key1=value1, value2";

    expect(yamlToProps(input1)).toBe(output1);

    const input2 = `
key1:
    - value1
    - value2
key2:
    - value1
    - value2
`;
    const output2 = `key1=value1, value2
key2=value1, value2`;

    expect(yamlToProps(input2)).toBe(output2);
  });

  test("multiple docs", () => {
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
    const output = `doc1.key1=value
doc1.key2.key3.key4=true
doc1.key5=5
doc1.key6=null
doc2.key1.key2.key3=value1, value2`;

    expect(yamlToProps(input)).toBe(output);
  });
});
