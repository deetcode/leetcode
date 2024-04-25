/**
 * Hash Map - Frequency Counter
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/valid-anagram/
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const map = new Map();

  for (const c of s) {
    const count = (map.get(c) || 0) + 1;
    map.set(c, count);
  }

  for (const c of t) {
    if (!map.has(c)) return false;
    map.set(c, map.get(c) - 1);
  }

  for (const [char, count] of map) {
    if (count !== 0) {
      return false;
    }
  }

  return true;
};

const assert = require("assert");
const res = isAnagram("anagram", "nagaram");
assert(res === true);
