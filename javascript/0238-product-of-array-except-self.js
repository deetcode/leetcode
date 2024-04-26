/**
 * Array
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/product-of-array-except-self/
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const left = Array(nums.length).fill(0);
  const right = Array(nums.length).fill(0);

  left[0] = 1;
  right[nums.length - 1] = 1;

  for (let i = 1; i < nums.length; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  for (let j = nums.length - 2; j >= 0; j--) {
    right[j] = right[j + 1] * nums[j + 1];
  }

  const res = [];

  for (let k = 0; k < nums.length; k++) {
    res.push(left[k] * right[k]);
  }

  return res;
};

const nums = [1, 2, 3, 4];
const res = productExceptSelf(nums);
const assert = require("assert");
assert.deepEqual(res, [24, 12, 8, 6]);
