import * as yaml from "js-yaml";

type KeyValue = [key: string, value: string];

function appendKey(key1: string, key2: string): string {
  if (key1.length) {
    return `${key1}.${key2}`;
  }
  return key2;
}

function toProps(target: any, key: string, result: KeyValue[]) {
  if (typeof target === "string") {
    result.push([key, target]);
  } else if (Array.isArray(target)) {
    result.push([key, target.join(", ")]);
  } else if (typeof target === "boolean" || typeof target === "number") {
    result.push([key, target.toString()]);
  } else if (typeof target === "object") {
    if (target) {
      Object.entries(target).forEach(([nextKey, value]) => {
        toProps(value, appendKey(key, nextKey), result);
      });
    } else {
      result.push([key, "null"]);
    }
  }
}

export function yamlToProps(yamlText: string): string {
  const result: KeyValue[] = [];
  yaml.loadAll(yamlText, (doc: any) => toProps(doc, "", result));
  return result.map(([key, value]) => `${key}=${value}`).join("\n");
}
