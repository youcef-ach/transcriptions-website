from django.contrib import admin
from django.urls import path
import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def proxy_view(request, path):
    REMOTE_API = "http://193.194.66.152:8080/"
    url = f"{REMOTE_API}/{path}"
    method = request.method

    headers = {k: v for k, v in request.headers.items() if k.lower() != "host"}

    try:
        if method == "GET":
            resp = requests.get(url, headers=headers, params=request.GET)
        elif method == "POST":
            resp = requests.post(url, headers=headers, data=request.body)
        elif method == "PUT":
            resp = requests.put(url, headers=headers, data=request.body)
        elif method == "DELETE":
            resp = requests.delete(url, headers=headers)
        else:
            return JsonResponse({"error": "method not supported"}, status=405)

        return HttpResponse(
            resp.content,
            status=resp.status_code,
            content_type=resp.headers.get("Content-Type", "application/json"),
        )

    except requests.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("proxy/<path:path>", proxy_view),
]