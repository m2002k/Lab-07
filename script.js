const Key = 'b-eThh7A8UD-ZDQ5-vJuJt-qUl4MReuVzntYc69Bpgg';
const API = 'https://api.unsplash.com/search/photos';
let Results = document.getElementById("Results");
function clearResults() {
    searchResults.innerHTML = "";
}

function clearResults() {
    Results.innerHTML = "";
}

// Fetch with XHR
document.getElementById("FetchXHR").addEventListener("click", function() {
    clearResults();
    let query = document.getElementById("Search").value;
    if (!query) return;
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${API}?query=${encodeURIComponent(query)}&client_id=${Key}&per_page=16`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            displayResults(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
});

// Fetch with Promises
document.getElementById("FetchPromise").addEventListener("click", function() {
    clearResults();
    let query = document.getElementById("Search").value;
    if (!query) return;

    fetch(`${API}?query=${encodeURIComponent(query)}&client_id=${Key}&per_page=16`)
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error("Error fetching data:", error));
});

// Fetch with Async/Await
document.getElementById("FetchAsync/Await").addEventListener("click", async function() {
    clearResults();
    let query = document.getElementById("Search").value;
    if (!query) return;

    try {
        let response = await fetch(`${API}?query=${encodeURIComponent(query)}&client_id=${Key}&per_page=16`);
        let data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// Display Results
function displayResults(data) {
    if (!data.results.length) {
        Results.innerHTML = "<p>No Results Found</p>";
        return;
    }
    data.results.forEach(item => {
        let img = document.createElement("img");
        img.src = item.urls.small;
        img.alt = item.alt_description;
        Results.appendChild(img);
    });
}

