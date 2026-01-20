
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the Home page
        cwd = os.getcwd()
        home_path = f"file://{cwd}/index.html"
        print(f"Navigating to Home: {home_path}")
        page.goto(home_path)

        # Take a screenshot of the Home page menu
        page.screenshot(path="verification/home_menu.png")
        print("Screenshot saved to verification/home_menu.png")

        # Verify "Apple Music" link exists and click it
        # Use exact=True to avoid conflict with the body link "Apple Music Page"
        apple_music_link = page.get_by_role("link", name="Apple Music", exact=True)

        if apple_music_link.is_visible():
            print("Apple Music link is visible on Home page")
            apple_music_link.click()
        else:
            print("Apple Music link is NOT visible on Home page")
            return

        # Wait for navigation
        page.wait_for_load_state("domcontentloaded")

        # Check title or something unique to Apple Music page
        print(f"Current Title: {page.title()}")

        # Take a screenshot of the Apple Music page menu
        page.screenshot(path="verification/apple_music_page_menu.png")
        print("Screenshot saved to verification/apple_music_page_menu.png")

        # Verify "Home" link exists on Apple Music page
        # Use exact match to avoid logo
        home_link = page.get_by_role("link", name="Home", exact=True)
        if home_link.is_visible():
            print("Home link is visible on Apple Music page")
        else:
            print("Home link is NOT visible on Apple Music page")

        browser.close()

if __name__ == "__main__":
    run()
