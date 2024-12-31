
import xbmcgui
import webbrowser

# URL of the GitHub Pages site
GITHUB_URL = "https://gofetchavideo.github.io/18-Content/"

def main():
    # Open the URL in the default web browser
    xbmcgui.Dialog().ok("Go Fetch a Video", "Opening the video picker...")
    webbrowser.open(GITHUB_URL)

if __name__ == "__main__":
    main()
