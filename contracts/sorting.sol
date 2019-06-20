pragma solidity >=0.5.7;

library SortingMethods {

  function heapSort(uint[] memory self) public pure returns(uint[] memory) {
    if (self.length >= 2) {
      uint256 end = self.length - 1;
      uint256 start = (end-1)/2;
      uint256 root = start;
      uint256 lChild;
      uint256 rChild;
      uint256 swap;


      // Creating Max Heap
      while(start >= 0){
        root = start;
        lChild = start * 2 + 1;
        while(lChild <= end){
          rChild = lChild + 1;
          swap = root;
          if(self[swap] < self[lChild])
            swap = lChild;
          if((rChild <= end) && (self[swap]<self[rChild]))
            swap = rChild;
          if(swap == root)
            lChild = end+1;
          else {
            (self[swap], self[root]) = (self[root], self[swap]);
            root = swap;
            lChild = root*2 + 1;
          }
        }
        if(start == 0)
          break;
        start--;
      }
      while(end > 0){
        (self[0],self[end]) = (self[end],self[0]);
        end--;
        root = 0;
        lChild = 1;
        while(lChild <= end){
          rChild = lChild + 1;
          swap = root;
          if(self[swap] < self[lChild])
            swap = lChild;
          if((rChild <= end) && (self[swap]<self[rChild]))
            swap = rChild;
          if(swap == root)
            lChild = end + 1;
          else {
            (self[swap], self[root]) = (self[root], self[swap]);
            root = swap;
            lChild = root*2 +1;
          }
        }
      }
    }
      return self;
    }


    function quickSort(uint[] memory input) internal pure returns(uint[] memory) {
        if (input.length >= 2) {
          quickSortMain(input, 0, int(input.length - 1));
        }
     return input;
      }

      function quickSortMain(uint[] memory arr, int left, int right) internal pure {
        int i = left;
        int j = right;
        if(i==j) return;
        uint pivot = arr[uint(left + (right - left) / 2)];
        while (i <= j) {
          while (arr[uint(i)] < pivot) i++;
          while (pivot < arr[uint(j)]) j--;
          if (i <= j) {
            (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
            i++;
            j--;
          }
        }

        if (left < j)
          sort(arr, left, j);
        if (i < right)
          sort(arr, i, right);
      }



  function bubbleSort(uint[] memory arr) public pure returns(uint[] memory) {
      if (arr.length >= 2) {
        bool swapped;
        uint n = arr.length;
        uint i;
        uint j;
        for (i = 0; i < n-1; i++){
           swapped = false;
           for (j = 0; j < n-i-1; j++){
             if (arr[j] > arr[j+1]){
               (arr[j], arr[j+1]) = (arr[j+1], arr[j]);
               swapped = true;
              }
            }
            if(swapped==false) break;
        }

      }
    return arr;
  }


  function mergeSort(uint[] memory a) public pure returns(uint[] memory) {
    if (a.length >= 2) {
      mergeSortMain(input, 0, a.length-1);
    }
    return a;
  }

  function mergeSortMain(uint[] memory arr, uint l, uint r) internal pure {
    if (l == r) return;

    // Create indexes of arrays
    uint i;
    uint j;
    uint k;

    // Same as (l+r)/2, but avoids overflow for
    // large l and h
    uint m = l+(r-l)/2;

    // Sort first and second halves
    mergeSortMain(arr, l, m);
    mergeSortMain(arr, m+1, r);

    /* Merge code below */

    // length of left(n1) and right(n2) array
    uint n1 = m - l + 1;
    uint n2 =  r - m;

    /* create temp arrays in memory (locally) */
    uint[] memory left = new uint[](n1);
    uint[] memory right = new uint[](n2);

    /* Copy data to temp arrays left[] and right[] */
    for (i = 0; i < n1; i++)
        left[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        right[j] = arr[m + 1+ j];

    /* Merge the temp arrays back into arr[l..r]*/
    i = 0; // Initial index of first subarray
    j = 0; // Initial index of second subarray
    k = l; // Initial index of merged subarray
    while (i < n1 && j < n2)
    {
        if (left[i] <= right[j])
        {
            arr[k] = left[i];
            i++;
        }
        else
        {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    /* Copy the remaining elements of left[], if there
       are any */
    while (i < n1)
    {
        arr[k] = left[i];
        i++;
        k++;
    }

    /* Copy the remaining elements of right[], if there
       are any */
    while (j < n2)
    {
        arr[k] = right[j];
        j++;
        k++;
    }
  }


}
