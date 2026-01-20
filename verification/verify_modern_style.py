
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        cwd = os.getcwd()
        home_path = f"file://{cwd}/index.html"

        # --- Desktop View ---
        page_desktop = browser.new_page(viewport={"width": 1280, "height": 800})
        print(f"Navigating to Home (Desktop): {home_path}")
        page_desktop.goto(home_path)

        # Verify White Nav (Visual check via screenshot)
        page_desktop.screenshot(path="verification/modern_desktop.png")
        print("Screenshot saved: verification/modern_desktop.png")

        # --- Mobile View ---
        page_mobile = browser.new_page(viewport={"width": 375, "height": 812})
        print(f"Navigating to Home (Mobile): {home_path}")
        page_mobile.goto(home_path)

        # Open Menu to see styling
        page_mobile.locator(".nav-toggle").click()
        page_mobile.wait_for_timeout(500) # Wait for slide animation

        page_mobile.screenshot(path="verification/modern_mobile.png")
        print("Screenshot saved: verification/modern_mobile.png")

        browser.close()

if __name__ == "__main__":
    run()
