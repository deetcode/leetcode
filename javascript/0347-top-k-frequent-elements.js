/**
 * Hash Map - Frequency Counter | Using sort
 * Time O(NlogN) | Space O(N)
 * https://leetcode.com/problems/top-k-frequent-elements/
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();

  for (const num of nums) {
    const count = map.get(num) || 0;
    map.set(num, count + 1);
  }

  let entries = [...map.entries()];
  entries = entries.sort((a, b) => b[1] - a[1]);

  const res = [];
  for (let i = 0; i < k; i++) {
    res.push(entries[i][0]);
  }

  return res;
};

const res = topKFrequent([1, 1, 1, 2, 2, 3], 2);
const assert = require("assert");
assert.deepEqual(res, [1, 2]);
