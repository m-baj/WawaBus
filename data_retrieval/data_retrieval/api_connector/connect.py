from data_retrieval.config import settings
import requests


def add_api_key(url: str) -> str:
    return url + "&apikey=" + settings.WARSAW_API_KEY


def get_all_bus_locations() -> dict:
    query_url = "/action/busestrams_get/?resource_id=f2e5503e-927d-4ad3-9500-4ab9e55deb59"
    url = add_api_key(settings.WARSAW_API_URL + query_url + "&type=1")
    r = requests.post(
        url,
        headers={"Content-Type": "application/json", 'Cache-Control': 'no-cache'}
    )
    if r.status_code != 200:
        raise Exception(f"Failed to retrieve data from {url}")

    try:
        output_json = r.json()
    except ValueError:
        raise Exception(f"Failed to parse response from {url}")

    if "result" not in output_json:
        raise Exception(f"Invalid response from {url}")

    if len(output_json["result"]) == 0:
        raise Exception(f"No data retrieved from {url}")

    return output_json
