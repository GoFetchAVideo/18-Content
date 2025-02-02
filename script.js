fetch('urls/url-lists.json')
    .then(response => response.json())
    .then(data => {
        const button1Urls = data.button1;
        const button2Urls = data.button2;

        document.getElementById("button1").addEventListener("click", () => {
            const randomUrl = button1Urls[Math.floor(Math.random() * button1Urls.length)];
            window.location.href = randomUrl;
        });

        document.getElementById("button2").addEventListener("click", () => {
            const randomUrl = button2Urls[Math.floor(Math.random() * button2Urls.length)];
            window.location.href = randomUrl;
        });
    });
