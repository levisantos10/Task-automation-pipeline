import requests

def get_weather(city):
    try:
        url = f"https://wttr.in/{city}?format=j1"
        response = requests.get(url, timeout=10)
        data = response.json()

        temp = data["current_condition"][0]["temp_C"]
        feels_like = data["current_condition"][0]["FeelsLikeC"]
        description = data["current_condition"][0]["weatherDesc"][0]["value"]

        return {
            "success": True,
            "message": f"🌤️ {city}: {temp}°C, sensação de {feels_like}°C. {description}",
            "temp": temp,
            "feels_like": feels_like,
            "description": description
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"Erro ao buscar clima: {str(e)}"
        }
    