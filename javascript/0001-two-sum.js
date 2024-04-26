/**
 * Hash Map - 1 Pass
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/two-sum/
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map();

  for (const [index, num] of nums.entries()) {
    const complement = target - num;
    if (map.has(complement)) {
      return [map.get(complement), index];
    }
    map.set(num, index);
  }
};

const res = twoSum([2, 7, 11, 15], 9);

const assert = require("assert");
assert(res, [0, 1]);
