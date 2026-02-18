import requests

def check_website(url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return {
                "success": True,
                "message": f"✅ Site {url} está online!",
                "status_code": response.status_code,
                "response_time": response.elapsed.total_seconds()
            }
        else:
            return {
                "success": False,
                "message": f"⚠️ Site {url} retornou status {response.status_code}",
                "status_code": response.status_code
            }
    except requests.exceptions.ConnectionError:
        return {
            "success": False,
            "message": f"❌ Site {url} está fora do ar!"
        }
    except requests.exceptions.Timeout:
        return {
            "success": False,
            "message": f"⏱️ Site {url} demorou demais para responder!"
        }
    