steps = 0;


function generateArray(n = 10, range = 10) {
    ret = [];
    for(i = 0; i < n; i++) {
        ret[i] = Math.floor(Math.random() * 10);
    }
    return ret;
}

function mergeSort(arr){
    const len = arr.length;
    if(len < 2) {
        return arr;
    }
    //divide
    // NOTE: the 'const' keyword is necessary due to pass-by-value for primitives in JS
    const mid = Math.floor(len/2)
    const l = arr.splice(0, mid);
    const r = arr
    //mutually recursive call
    return merge(mergeSort(l), mergeSort(r))
}


function merge(l,r) {
    let ret = []
    while(l.length && r.length) {
        steps++
        if(l[0] < r[0]) { 
            ret.push(l.shift())
        } else {
            ret.push(r.shift())
        }
    }
    // for rest
    // NOTE: changing the 'while' to 'if' sorts the full array approx half the time
    //       I supposed this happens because *most* of the functionality of the below 'while's
    //       is the one-step above recursive case of going from 1 item arrays to 2 item arrays
    while(l.length) {
        steps++
        ret.push(l.shift())
    }
    while(r.length) {
        steps++
        ret.push(r.shift())
    }
    return ret;
}

function run(){
    arr = generateArray();
    document.getElementById("sample").innerText = "sample x: " + arr;
    sorted = mergeSort(arr);
    document.getElementById("sorted").innerText = "sample x: " + sorted;
    console.log("steps:" + steps)
}

document.addEventListener('DOMContentLoaded', run());