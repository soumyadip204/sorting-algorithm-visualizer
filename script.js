let array = [];
let arraySize = document.getElementById("arraySize").value;
let arrayContainer = document.getElementById("array-container");
let delay = 50;  // Default delay for speed control

// Function to update the sorting speed
function updateSpeed() {
    let speed = document.getElementById("speedControl").value;
    delay = 101 - speed;  // Inverse relation: Higher speed means less delay
}

// Function to generate a new random array
function generateArray() {
    arraySize = document.getElementById("arraySize").value;
    array = [];
    arrayContainer.innerHTML = '';

    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }

    displayArray();
}

// Function to display the array as bars
function displayArray() {
    arrayContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i] * 4}px`;
        bar.style.width = `${100 / array.length}%`;
        arrayContainer.appendChild(bar);
    }
}

// Function to delay execution for sorting visualization
function delayTime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to display the time and space complexity of algorithms
function showComplexity(worstTime, avgTime, bestTime, space) {
    document.getElementById('worst-time-complexity').innerText = worstTime;
    document.getElementById('average-time-complexity').innerText = avgTime;
    document.getElementById('best-time-complexity').innerText = bestTime;
    document.getElementById('space-complexity').innerText = space;
}

// Sorting Algorithms

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
                displayArray();
            }
            await delayTime(delay);
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(i, minIndex);
            displayArray();
        }
        await delayTime(delay);
    }
}
// Insertion Sort
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            displayArray();
            await delayTime(delay);
        }
        array[j + 1] = key;
        displayArray();
        await delayTime(delay);
    }
}

// Merge Sort
async function mergeSort(arr = array, l = 0, r = array.length - 1) {
    if (l >= r) {
        return;
    }
    let m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
        displayArray();
        await delayTime(delay);
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        displayArray();
        await delayTime(delay);
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        displayArray();
        await delayTime(delay);
    }
}

// Quick Sort
async function quickSort(arr = array, low = 0, high = array.length - 1) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            await swap(i, j);
            displayArray();
            await delayTime(delay);
        }
    }
    await swap(i + 1, high);
    displayArray();
    await delayTime(delay);
    return (i + 1);
}

// Heap Sort
async function heapSort() {
    let n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        await swap(0, i);
        displayArray();
        await delayTime(delay);
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest != i) {
        await swap(i, largest);
        displayArray();
        await delayTime(delay);
        await heapify(n, largest);
    }
}

// Helper function to swap two elements in the array
async function swap(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// Function to trigger sorting based on the selected algorithm
function sortArray() {
    let algorithm = document.getElementById('algorithms').value;
    switch (algorithm) {
        case 'bubbleSort':
            showComplexity('O(n^2)', 'Θ(n^2)', 'Ω(n)', 'O(1)');
            bubbleSort();
            break;
        case 'selectionSort':
            showComplexity('O(n^2)', 'Θ(n^2)', 'Ω(n^2)', 'O(1)');
            selectionSort();
            break;
        case 'insertionSort':
            showComplexity('O(n^2)', 'Θ(n^2)', 'Ω(n)', 'O(1)');
            insertionSort();
            break;
        case 'mergeSort':
            showComplexity('O(n log n)', 'Θ(n log n)', 'Ω(n log n)', 'O(n)');
            mergeSort();
            break;
        case 'quickSort':
            showComplexity('O(n^2)', 'Θ(n log n)', 'Ω(n log n)', 'O(log n)');
            quickSort();
            break;
        case 'heapSort':
            showComplexity('O(n log n)', 'Θ(n log n)', 'Ω(n log n)', 'O(1)');
            heapSort();
            break;
    }
}

// Initialize with a random array on load
window.onload = generateArray;
