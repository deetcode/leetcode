/**
 * Hash Set - Intelligent Sequence
 * Greedy - Max Score
 * Time O (N) | Space O(N)
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (const num of nums) {
    let streak = 1;
    let cur = num;

    if (numSet.has(num - 1)) continue;

    while (numSet.has(cur + 1)) {
      streak++;
      cur++;
    }

    longest = Math.max(longest, streak);
  }

  return longest;
};

const res = longestConsecutive([100, 4, 200, 1, 3, 2]);
const assert = require("assert");
assert(res === 4);
