from django.test import TestCase, RequestFactory
from unittest.mock import patch, MagicMock
from proxy.urls import proxy_view


class ProxyGatewayTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    @patch("proxy.urls.requests.get")
    def test_proxy_get_forwards_successfully(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.content = b'{"status": "ok", "transcriptions": []}'
        mock_resp.headers = {"Content-Type": "application/json"}
        mock_get.return_value = mock_resp

        request = self.factory.get("/proxy/api/transcriptions/?page=1")
        response = proxy_view(request, "api/transcriptions/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'{"status": "ok", "transcriptions": []}')
        self.assertTrue(mock_get.called)

    @patch("proxy.urls.requests.post")
    def test_proxy_post_forwards_payload(self, mock_post):
        mock_resp = MagicMock()
        mock_resp.status_code = 201
        mock_resp.content = b'{"id": 101, "message": "created"}'
        mock_resp.headers = {"Content-Type": "application/json"}
        mock_post.return_value = mock_resp

        request = self.factory.post(
            "/proxy/api/transcribe/",
            data=b'{"url": "https://youtube.com/watch?v=demo"}',
            content_type="application/json"
        )
        response = proxy_view(request, "api/transcribe/")

        self.assertEqual(response.status_code, 201)
        self.assertTrue(mock_post.called)

    def test_proxy_unsupported_method_returns_405(self):
        request = self.factory.generic("PATCH", "/proxy/api/test/")
        response = proxy_view(request, "api/test/")
        self.assertEqual(response.status_code, 405)

