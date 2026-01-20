
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)

        # --- TEST 1: Mobile Viewport ---
        # Set viewport to a mobile size (e.g., iPhone X)
        page = browser.new_page(viewport={"width": 375, "height": 812})

        cwd = os.getcwd()
        home_path = f"file://{cwd}/index.html"
        print(f"Navigating to Home (Mobile): {home_path}")
        page.goto(home_path)

        # Verify Hamburger Button is visible
        nav_toggle = page.locator(".nav-toggle")
        if nav_toggle.is_visible():
            print("Hamburger button is visible on mobile.")
        else:
            print("ERROR: Hamburger button is NOT visible on mobile.")

        # Verify Nav List is hidden initially (or off-screen)
        nav_list = page.locator("#nav-list")
        # In CSS we set it to translateX(100%). Playwright might consider it 'visible' in the DOM,
        # but we can check if it's within viewport or check bounding box.
        # Actually, let's just check if the toggle click works.

        # Click Toggle
        print("Clicking hamburger button...")
        nav_toggle.click()

        # Wait for transition (approx 300ms)
        page.wait_for_timeout(500)

        # Verify Nav List has 'active' class
        if "active" in nav_list.get_attribute("class"):
            print("Nav list has 'active' class after click.")
        else:
            print("ERROR: Nav list does NOT have 'active' class after click.")

        # Check aria-expanded
        is_expanded = nav_toggle.get_attribute("aria-expanded")
        print(f"Aria-expanded is: {is_expanded}")

        # Screenshot Open Menu
        page.screenshot(path="verification/mobile_menu_open.png")
        print("Screenshot saved: verification/mobile_menu_open.png")

        # --- TEST 2: Desktop Viewport ---
        page_desktop = browser.new_page(viewport={"width": 1280, "height": 720})
        print(f"Navigating to Home (Desktop): {home_path}")
        page_desktop.goto(home_path)

        # Verify Hamburger Button is hidden
        nav_toggle_desktop = page_desktop.locator(".nav-toggle")
        if not nav_toggle_desktop.is_visible():
            print("Hamburger button is hidden on desktop.")
        else:
            print("ERROR: Hamburger button is VISIBLE on desktop.")

        # Verify Nav List is visible (flex row)
        nav_list_desktop = page_desktop.locator("#nav-list")
        if nav_list_desktop.is_visible():
            print("Nav list is visible on desktop.")
        else:
            print("ERROR: Nav list is NOT visible on desktop.")

        # Screenshot Desktop
        page_desktop.screenshot(path="verification/desktop_nav.png")
        print("Screenshot saved: verification/desktop_nav.png")

        browser.close()

if __name__ == "__main__":
    run()
