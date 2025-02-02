document.addEventListener("DOMContentLoaded", () => {
    let links = document.querySelectorAll("#url-list a"); // Select all links inside #url-list
    let urls = [];

    links.forEach(link => {
        urls.push(link.href); // Extract URL from each <a> tag
    });

    console.log("Extracted URLs:", urls);

    // Example: Do something with the URLs (e.g., displaying them)
    let outputDiv = document.getElementById("output");
    urls.forEach(url => {
        let p = document.createElement("p");
        p.textContent = `Processing URL: ${url}`;
        outputDiv.appendChild(p);
    });
});
