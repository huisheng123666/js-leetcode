var originalDigits = function(s) {
  let result = []
  const engNums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  for (let i = 0, len = engNums.length; i< len; i++) {
    let max = engNums[i].length
    let res = 0
    for (let j = 0; j < max; j++) {
      if (s.indexOf(engNums[i][j]) > -1) {
        res++
      } else break
    }
    if (res === max) {
      for (let k = 0; k < max; k++) {
        let reg = new RegExp(engNums[i][k])
        s = s.replace(reg, '')
      }
      result.push(i)
    }
  }
  if (s.length > 0) return originalDigits(s).concat(result)
  return result.sort().join('')
};

// 224
var characterReplacement = function(s, k) {
  let res = 0
  let max = 0
  let hash = {}
  for (let i = 0, len = s.length; i < len; i++) {
    if (!hash[s[i]]) {
      hash[s[i]] = 1
    } else {
      hash[s[i]]++
    }
    // "AABABBA" 1
    // max 1 2 2 3 3 3
    // res 1 2 3 4 4 4
    // 子串最大值变大
    if (hash[s[i]] > max) max = hash[s[i]]
    // 如果当前窗口最长子串和窗口差比k小，窗口变大
    if (res - max < k) {
      res++
    } else {
      // 刚好不代表找到最长，右移继续找最大值
      // i - res为窗口左侧位置，移到哪里就删除那个位置的个数--
      hash[s[i - res]]--
    }
  }
  return res
};

// 984
var strWithout3a3b = function(A, B) {
  let res = ''
  // 不断趋向A = B
  while(A > 0 || B > 0) {
    if (A > B) {
      if (A > 1) {
        res += 'aa'
        A -= 2
      } else if (A > 0) {
        res += 'a'
        A--
      }
      if (B > 0) {
        res += 'b'
        B--
      }
    }
    if (A < B) {
      if (B > 1) {
        res += 'bb'
        B -= 2
      } else if (B > 0) {
        res += 'b'
        B--
      }
      if (A > 0) {
        res += 'a'
        A--
      }
    }
    if (A === B) {
      res += 'ab'
      A--
      B--
    }
  }
  return res
};

// 985
var sumEvenAfterQueries = function(A, queries) {
  let res = []
  let sum = 0
  sum = A.reduce((total, item) => {
    if (item % 2 === 0) return total + item
    return total
  }, sum)
  for (let i = 0, len = queries.length; i < len; i++) {
    let val = queries[i][0]
    let index = queries[i][1]
    let item = A[index] + val
    if (item % 2 === 0 && A[index] % 2 === 0) {
      res.push(sum += val)
    }
    if (item % 2 === 0 && A[index] % 2 !== 0) {
      res.push(sum += item)
    }
    if (item % 2 !== 0 && A[index] % 2 === 0) {
      res.push(sum -= A[index])
    }
    if (item % 2 !== 0 && A[index] % 2 !== 0) {
      res.push(sum)
    }
    A[index] = item
  }
  return res
};

// 986
var intervalIntersection = function(A, B) {
  let res = []
  for (let i = 0, len = A.length; i < len; i++) {
    for (let j = 0, len2 = B.length; j < len2; j++) {
      if (A[i][0] > B[j][1] || B[j][0] > A[i][1]) continue
      res.push([Math.max(A[i][0], B[j][0]), Math.min(A[i][1], B[j][1])])
    }
  }
  return res
};

// 738
var monotoneIncreasingDigits = function(N) {
  let arr = N.toString().split('').map(item => parseInt(item, 10))
  let res = true
  while(res) {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
      if (arr[i] <= arr[i + 1]) {
        res = false
      } else {
        arr[i]--
        for (let j = i + 1; j < len; j++) {
          arr[j] = 9
        }
        res = true
        break
      }
    }
  }
  return parseInt(arr.join(''), 10)
};

// 739
var dailyTemperatures = function(T) {
  let res = []
  for (let i = 0, len = T.length; i < len; i++) {
    for(let j = i + 1; j < len; j++) {
      if (T[j] - T[i] >= 1) {
        res.push(j - i)
        break
      }
    }
    if (res.length === i) {
      res.push(0)
    }
  }
  return res
};

// 78
var subsets = function(nums) {
  var res=[[]];
  for(var i=0;i<nums.length;i++){
    var len=res.length;
    for(var ii=0;ii<len;ii++){
      res.push([...res[ii], nums[i]]);
    }
  }
  return res;
};

// 90
var subsetsWithDup = function(nums) {
  nums.sort()
  var res=[[]];
  let tem = []
  for(var i=0;i<nums.length;i++){
    var len=res.length;
    // 如出现重复，缓存起来，形成一个新的元素与之前的子集合并
    if (nums[i] === nums[i - 1]) {
      // push两个是为了避免和不包含的子集合并重复
      tem.length === 0 ? tem.push(nums[i], nums[i]) : tem.push(nums[i])
    } else {
      // 注意清空缓存
      tem.length = 0
    }
    for(var ii=0;ii<len;ii++){
      // 新子集由当前元素与之前子集的合并构成
      // 如果子集已包含该元素，再和缓存合并会多一个
      if (res[ii].indexOf(nums[i]) > -1) continue
      let item = tem.length ? tem : [nums[i]]
      res.push([...res[ii], ...item]);
    }
  }
  return res;
};

// 300 动态规划
var lengthOfLIS = function(nums) {
  if (nums.length === 1) return 1
  if (nums.length === 0) return 0
  let res = []
  for (let i = 0, len = nums.length; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      let tem = []
      if (nums[j] > nums[i]) {
        tem.push(nums[j])
        for (let k = j - 1; k > i; k--) {
          if (nums[k] > nums[i] && nums[k] < tem[0]) {
            tem.unshift(nums[k])
          }
        }
      }
      tem.unshift(nums[i])
      if (tem.length > res.length) {
        res = [...tem]
      }
    }
  }
  return res.length
};


// 304
/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
  this.dp = matrix.map(() => [])
  for (let i = 0, len = matrix.length; i< len; i++) {
    this.dp[i][0] = matrix[i][0]
    for (let j = 1, len2 = matrix[i].length; j < len2; j++) {
      this.dp[i][j] = this.dp[i][j - 1] + matrix[i][j]
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  let res = 0
  for (let i = row1; i <= row2; i++) {
    let rowNum = this.dp[i][col1 - 1] ? this.dp[i][col2] - this.dp[i][col1 - 1] : this.dp[i][col2]
    res += rowNum
  }
  return res
};

// 307
var NumArray = function(nums) {
  this.nums = nums
  this.dp = [nums[0]]
  this.len = nums.length
  for (let i = 1; i < this.len; i++) {
    this.dp[i] = this.dp[i - 1] + nums[i]
  }
};

/**
 * @param {number} i
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(i: number, val: number) {
  let sl = val - this.nums[i]
  for (let j = i; j < this.len; j++) {
    this.dp[j] += sl
  }
  this.nums[i] = val
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i: number, j: number) {
  return this.dp[i - 1] ? this.dp[j] - this.dp[i - 1] : this.dp[j]
};

// 221
var maximalSquare = function(matrix: number[][]) {
  let max: number = 0
  for (let i = 0, len = matrix.length; i < len; i++) {
    let arr: number[] = []
    matrix[i].some((item, index) => {
      if (item == 1) {
        arr.push(index)
        let can: boolean = true
        if (arr.length > len - i) return true
        for (let j = i + 1, lenj = i + arr.length; j < lenj; j++) {
          for (let k = 0, lenk = arr.length; k < lenk; k++) {
            if (matrix[j][arr[k]] != 1) {
              can = false
              arr.splice(0, k + 1)
              break
            }
          }
          if (!can) break
        }
        if (can && max < arr.length) max = arr.length
      } else {
        arr.length = 0
      }
    })
  }
  return max * max
};

// 223
var computeArea = function(A, B, C, D, E, F, G, H) {
  if (C <= E || H <= B || F >= D || G <= A) {
    return (G - E) * (H - F) + (D - B) * (C - A)
  }
  let width = Math.min(G, C) - Math.max(E, A)
  let height = Math.min(D, H) - Math.max(B, F)
  return (G - E) * (H - F) + (D - B) * (C - A) - width * height
};

// 991
var brokenCalc = function(X, Y) {
  if (X > Y) return X - Y
  let res = 0
  while (X < Y) {
    if ((Y % 2) === 0) {
      Y /= 2
      res++
    } else {
      Y = (Y + 1) / 2
      res += 2
    }
  }
  return res + X - Y
}


var decodeString = function(s) {
  let reg = /\d+\[\w+\]/g
  while (s.match(reg)) {
    let arr = s.match(reg)
    arr.forEach(item => {
      let rep = parseInt(item.match(/\d+/g), 10)
      let str = item.match(/\[a-z]+/)[0]
      s = s.replace(item, str.repeat(rep))
    })
  }
  return s
};

// 859
var buddyStrings = function(A, B) {
  if (A.length !== B.length) return false
  let arr1 = A.split('')
  if (A === B) {
    for (let i = 0, len = A.length; i < len; i++) {
      if (A.indexOf(A[i]) !== i) return true
    }
  }
  let index = null
  for (let i = 0, len = A.length; i < len; i++) {
    if (A[i] !== B[i]) {
      if (index !== null) {
        let tem = arr1[index]
        arr1[index] = arr1[i]
        arr1[i] = tem
        return arr1.join('') === B
      } else {
        index = i
      }
    }
  }
  return false
};

// 860
var lemonadeChange = function(bills) {
  let num = 0
  let arr = []
  for (let i = 0, len = bills.length; i < len; i++) {
    if (bills[i] === 5) {
      num++
    } else {
      let surplus = bills[i] - 5
      for (let j = 0, len2 = arr.length; j < len2; j++) {
        if (arr[j] <= surplus) {
          surplus -= arr[j]
          arr.splice(j, 1)
          j--
          if (surplus <= 5) break
        }
      }
      let need = surplus / 5
      if (need <= num) {
        num -= need
        arr.push(bills[i])
      } else {
        return false
      }
    }
  }
  return true
}

// 238
var productExceptSelf = function(nums) {
  if (nums.length === 2) return nums.reverse()
  let zero = 0
  nums.some(item => {
    if (item === 0) {
      zero++
      if (zero >= 2) return true
    }
  })
  let sum = nums.reduce((total, item) => item === 0 ? total : total * item)
  if (zero > 1) {
    return nums.map(item => 0)
  }
  if (zero === 1) {
    return nums.map(item => item === 0 ? sum : 0)
  }
  return nums.map(item => sum / item)
}

// 240
var searchMatrix = function(matrix, target) {
  if (matrix.length === 0) return false
  for (let i = 0, len = matrix.length; i < len; i++) {
    let item = matrix[i]
    if (item[item.length - 1] === target) return true
    if (item[item.length - 1] < target) continue
    let index = null
    for (let j = 0, len2 = item.length; j < len2; j++) {
      let tem = item[j]
      if (tem === target) return true
      if (tem > target) {
        index = j - 1
        break
      }
    }
    if (index === null) continue
    i++
    item = matrix[i]
    if (!item) return false
    if (item[index] === target) return true
    if (item[index - 1] === target) return true
  }
  return false
}

// 242
var isAnagram = function(s, t) {
  return s.split('').sort().join('') === t.split('').sort().join('')
}

// 435 未解
var eraseOverlapIntervals = function(intervals) {
  if (intervals.length <= 1) return 0
  intervals.sort((a, b) => a[0] - b[0])
  let res = []
  for (let i = 1, len = intervals.length; i < len; i++) {
    if (intervals[i][0] === intervals[i - 1][0] && intervals[i][1] === intervals[i - 1][1]) {
      if (!res.length) res.push(intervals[i])
      continue
    }
    if (intervals[i][0] >= intervals[i - 1][0] && intervals[i][0] < intervals[i - 1][1]) {
      if (intervals[i][1] > intervals[i - 1][1]) {
        res.push(intervals[i - 1])
      } else {
        res.push(intervals[i])
      }
      continue
    }
    if (i === 1) res.push(intervals[i - 1])
    res.push(intervals[i])
  }
  return intervals.length - res.length
}

// 438  滑动窗口
var findAnagrams = function (s, p) {
  // let res = []
  // p = p.split('').sort().join('')
  // for (let i = 0, len = s.length; i < len; i++) {
  //   if (len - 1 < p.length) break
  //   if (p.indexOf(s[i]) > -1) {
  //     let str = s.substr(i, p.length)
  //     if (str.split('').sort().join('') === p) {
  //       res.push(i)
  //       i += 3
  //     }
  //   }
  // }
  // return res
  // 窗口位置不断变化，达到需求马上移动left，判定长度改变res，hash记录次数避免遍历造成的性能问题
  let left = 0
  let right = 0
  let res = []
  let hash = {}
  let local = {}
  // 记录p字母出现次数
  for (let i = 0, len = p.length; i < len; i++) {
    !hash[p[i]] ? hash[p[i]] = 1 : hash[p[i]]++
  }
  // 需要对比的个数
  let match = Object.keys(hash).length
  // 右边界不断加并记录字母出现次数
  while (right < s.length) {
    if (s[right] in local) {
      local[s[right]]++
    } else local[s[right]] = 1
    // 出现字母次数相同减一
    if (local[s[right]] === hash[s[right]]) --match
    // 达到需求移动left
    while (match === 0) {
      if ((right - left + 1) === p.length) res.push(left)
      local[s[left]]--
      if (s[left] in hash && local[s[left]] < hash[s[left]]) ++match
      left++
    }
    right++
  }
  return res
}

// 441
var arrangeCoins = function(n) {
  if (n === 0) return 0
  for (let i = 0; i < n; i++) {
    let num = i + 1
    let total = (num + 1) * num / 2
    if (total > n) return i
    if (total === n) return num
  }
}

// 442
var findDuplicates = function (nums) {
  // 两次遍历速度慢
  // let result = []
  // for (let i = 0, len = nums.length; i < len; i++) {
  //   if (nums.indexOf(nums[i]) !== i) result.push(nums[i])
  // }
  // return result
  // hash缓存占内存速度快
  let result = []
  let hash = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (hash[nums[i]]) {
      result.push(nums[i])
    } else {
      hash[nums[i]] = i + 1
    }
  }
  return result
};


// 6
var convert = function(s, numRows) {
  if (numRows === 1) return s
  let arr = []
  for (let i = 0, len = s.length; i < len; i++) {
    if (!s) break
    if (i % 2 === 0) {
      arr.push(s.slice(0, numRows))
      s = s.slice(numRows)
    } else {
      arr.push(s.slice(0, numRows - 2))
      s = s.slice(numRows - 2)
    }
  }
  let res = ''
  for (let i = 0; i < numRows; i++) {
    if (i === 0 || i === numRows - 1) {
      arr.forEach((item, index) => {
        if (index % 2 === 0) res += item[i] || ''
      })
    } else {
      arr.forEach((item, index) => {
        if (index % 2 === 0) {
          res += item[i] || ''
        } else {
          let copy = item.split('')
          if (copy.length < numRows - 2) copy = copy.concat(new Array(numRows - 2 - copy.length))
          copy.reverse()
          res += copy[i - 1] || ''
        }
      })
    }
  }
  return res
}

// 7
var reverse = function(x) {
  x = x.toString()
  let res = ''
  if (/^\-\d+/.test(x)) {
    let num = x.match(/\d+/g)[0]
    res = '-' + num.split('').reverse().join('')
  } else {
    res = x.split('').reverse().join('')
  }
  res = Number(res)
  return res >= -Math.pow(2, 31) && res <= Math.pow(2, 31) - 1 ? res : 0
};

// 8
var myAtoi = function(str) {
  let res = null
  str = str.trim()
  if (!/^[/+-]?\d+/.test(str)) {
    return 0
  } else {
    res = str.match(/-?\d+/g)
    if (!res) return 0
    res = Number(res)
  }
  let max = Math.pow(2, 31) - 1
  let min = -Math.pow(2, 31)
  return res > max ? max : res < min ? min : res
};

// 82
var deleteDuplicates = function(head) {
  if(!head) return null
  let arr = []
  let repain = {}
  function del(head) {
    if (!head) return
    repain[head.val] ? repain[head.val]++ : repain[head.val] = 1
    if (repain[head.val] <= 1) {
      arr.push(head.val)
    } else if (repain[head.val] === 2) {
      let index = arr.indexOf(head.val)
      arr.splice(index, 1)
    }
    return del(head.next)
  }
  del(head)
  if (!arr.length) return null
  let res = new ListNode(arr[0])
  let current = res
  for (let i = 1, len = arr.length; i < len; i++) {
    current.next = new ListNode(arr[i])
    current = current.next
  }
  return res
};

// 88
var merge = function (nums1, m, nums2, n) {
  nums2 = nums2.splice(0, n)
  nums1.splice(m, n, ...nums2)
  nums1.sort((a, b) => a - b)
  return nums1
}

// 92
var reverseBetween = function(head, m, n) {
  let arr = []

  let index = 0
  function push(head) {
    index++
    if (!head) return
    if (index >= m && index <= n) {
      arr.push(head.val)
    }
    return push(head.next)
  }
  push(head)
  index = 0
  arr.reverse()
  let start = 0
  function change (head) {
    index++
    if (!head) return
    if (index >= m && index <= n) {
      head.val = arr[start]
      start++
    }
    return change(head.next)
  }
  change(head)
  return head
}

// 58
var lengthOfLastWord = function (s) {
  s = s.trim()

  if (!s) return 0
  let arr = s.split(' ')
  return arr[arr.length - 1].length
};

// 709
var toLowerCase = function(str) {
  let tem = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let res = ''
  for (let i = 0, len = str.length; i < len; i++) {
    let code = str[i].charCodeAt()
    if (code >= 65 && code <= 90 || code >= 97 && code <= 122) {
      res += (tem[code - 97] || tem[code - 65])
    } else {
      res += str[i]
    }
  }
  return res
};

// 713
var numSubarrayProductLessThanK = function(nums, k) {
  if (k <= 1) return 0
  let res = 0
  let left = 0
  let right = 0
  let total = 1
  let len = nums.length
  while (right < len) {
    total *= nums[right]
    while (total >= k) {
      total /= nums[left]
      ++left
    }
    res += right - left + 1
    right++
  }
  return res
};


// 866
var primePalindrome = function(N) {
  function isPrinme(n) {
    if(n === 0 || n === 1){
      return false;
    }
    if(n === 2){
      return true;
    }
    if (n % 2 === 0) return false
    for(var i = 3;i <= Math.sqrt(n); i+=2){
      if(n % i === 0){
        return false;
      }
    }
    return true;
  }
  function isBack(str) {
    let back = str.split('').reverse().join('')
    return str === back
  }
  while (N) {
    if (N <= 11 && isPrinme(N)) return N
    let str = N.toString()
    if (str.length % 2 === 0) {
      N = Math.pow(10, str.length)
      continue
    }
    if (isBack(str) && isPrinme(N)) return N
    N += 1
  }
}

// 867
var transpose = function(A) {
  let res = []
  for (let i = 0, len = A[0].length; i < len; i++) {
    let tem = []
    for (let j = 0, len2 = A.length; j < len2; j++) {
      tem.push(A[j][i])
    }
    res.push(tem)
  }
  return res
};

// 868
var binaryGap = function(N) {
  let str = N.toString(2)
  let start = str.indexOf('1')
  if (start < 0) return 0
  let res = 0
  for (let i = start, len = str.length; i < len; i++) {
    let index = str.indexOf('1', i + 1)
    if (index > -1) {
      let dis = index - i
      if (dis > res) res = dis
      i = index - 1
    }
  }
  return res
};

// 869
var reorderedPowerOf2 = function(N) {
  let str = N.toString().split('').sort().join('')
  let i = 0
  let item = 0
  while (item <= Math.pow(10, 9)) {
    item = Math.pow(2, i)
    if (item.toString().split('').sort().join('') === str) return true
    i++
  }
  return false
};

// 872
var leafSimilar = function(root1, root2) {
  function push(root) {
    let res = []
    if (!root.left && !root.right) {
      res.push(root.val)
    }
    if (root.left) res = [...res, ...push(root.left)]
    if (root.right) res = [...res, ...push(root.right)]
    return res
  }
  return push(root1).join('') === push(root2).join('')
};
