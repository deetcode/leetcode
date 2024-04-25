/**
 * Hash Set - Early Exit
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/contains-duplicate/
 * @param {number[]} nums
 * @return {boolean}
 */

var containsDuplicate = (nums) => {
  const s = new Set();
  for (const num of nums) {
    if (s.has(num)) return true;
    s.add(num);
  }
  return false;
};

const arr = [1, 2, 3, 1];
const res = containsDuplicate(arr);
console.log(res);
