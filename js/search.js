function search(arr, dst) {
  var min = 0,
      max = arr.length - 1;
  var mid;
  while(min <= max) {
    mid = Math.floor((max + min) / 2);
    if(arr[mid] > dst) {
      max = mid - 1;
    }
    else if(arr[mid] < dst) {
      min = mid + 1;
    }
    else {
      return mid
    }
  }
  return -1;
}


console.assert(1 == search([1,2,3], 2));
console.assert(1 == search([1,2,3,4], 2));
console.assert(3 == search([1,2,3,4], 4));
console.assert(0 == search([1,2,3,4], 1));
console.assert(-1 == search([1,2,3,4], 11));
console.assert(0 == search([1], 1));
console.assert(10 == search([1, 2, 4, 6, 7, 9, 19,20, 30, 40, 45, 47], 45));
