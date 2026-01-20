
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the Apple Music page
        cwd = os.getcwd()
        file_path = f"file://{cwd}/apple-music/index.html"
        print(f"Navigating to: {file_path}")
        page.goto(file_path)

        # Take a screenshot of the top of the page (Navigation + Header)
        page.screenshot(path="verification/apple_music_top.png")
        print("Screenshot saved to verification/apple_music_top.png")

        # Scroll to carousel and take another screenshot
        carousel = page.locator(".carousel")
        carousel.scroll_into_view_if_needed()
        page.screenshot(path="verification/apple_music_carousel.png")
        print("Screenshot saved to verification/apple_music_carousel.png")

        # Verify Navigation Link back to Home
        # Use exact=True to avoid matching "Darren Dizon Home"
        home_link = page.get_by_role("link", name="Home", exact=True)
        if home_link.is_visible():
            print("Home link is visible")
        else:
            print("Home link is NOT visible")

        browser.close()

if __name__ == "__main__":
    run()
