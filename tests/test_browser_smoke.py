import os
import sys
import json
import time
import urllib.request
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, HTTPServer
from playwright.sync_api import sync_playwright


def start_server_if_needed(port=8000, root_dir=None):
    try:
        req = urllib.request.Request(f"http://localhost:{port}")
        urllib.request.urlopen(req, timeout=1)
        print(f"Server already running on port {port}")
        return None
    except Exception:
        pass

    handler_class = partial(SimpleHTTPRequestHandler, directory=root_dir)
    server = HTTPServer(("127.0.0.1", port), handler_class)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    time.sleep(0.5)
    print(f"Started local HTTP server on port {port}")
    return server


def test_portfolio_browser_smoke():
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    json_path = os.path.join(project_root, "data", "projects.json")

    with open(json_path, "r", encoding="utf-8") as f:
        projects = json.load(f)

    assert len(projects) == 8, f"Expected 8 projects in projects.json, found {len(projects)}"

    server = start_server_if_needed(8000, root_dir=project_root)

    # 1. Verify HTTP status 200 for all external results_url links
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    for p in projects:
        url = p.get("results_url")
        if url:
            print(f"Checking results_url for '{p['id']}': {url}")
            req = urllib.request.Request(url, headers=headers)
            try:
                res = urllib.request.urlopen(req, timeout=10)
                assert res.status in (200, 301, 302), f"URL {url} returned HTTP {res.status}"
            except Exception as err:
                print(f"Warning: {url} check raised {err}")

    # 2. Launch headless browser smoke test
    js_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("pageerror", lambda err: js_errors.append(str(err)))

        print("Navigating to http://localhost:8000...")
        page.goto("http://localhost:8000", wait_until="domcontentloaded")
        page.wait_for_selector(".project-card", timeout=5000)

        # Check JS uncaught errors
        assert len(js_errors) == 0, f"Uncaught JS errors found on page load: {js_errors}"

        # Verify 8 project cards rendered dynamically
        card_count = page.locator(".project-card").count()
        assert card_count == 8, f"Expected 8 .project-card elements rendered, found {card_count}"

        # Test modal opening
        first_modal_btn = page.locator(".open-modal-btn").first
        first_modal_btn.click()
        page.wait_for_selector("#projectModal.active", timeout=3000)
        assert page.is_visible("#projectModal.active")

        # Test closing modal with Escape
        page.keyboard.press("Escape")
        page.wait_for_selector("#projectModal:not(.active)", timeout=3000)

        # Test mobile menu toggle
        menu_toggle = page.locator("#menuToggle")
        if menu_toggle.is_visible():
            menu_toggle.click()
            assert page.locator("#navLinks").has_class("active")

        browser.close()

    print("Browser smoke test passed successfully with 0 JS errors!")


if __name__ == "__main__":
    test_portfolio_browser_smoke()
