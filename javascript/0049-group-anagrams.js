/**
 * Hash Map
 * Time O(N * K) | Space O(N * K)
 * https://leetcode.com/problems/group-anagrams/
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();

  for (const str of strs) {
    const key = str.split("").sort().join("");
    if (!map.has(key)) {
      map.set(key, []);
    }
    const arr = map.get(key);
    arr.push(str);
  }

  return [...map.values()];
};

const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
const res = groupAnagrams(strs);

const assert = require("assert");
assert.deepEqual(res, [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]);
