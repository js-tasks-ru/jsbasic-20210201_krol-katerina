function filterRange(arr, a, b) {
  return arr.filter(function(elem){
    return elem >= a && elem <= b;
  });
}
