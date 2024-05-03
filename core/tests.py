from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from core.models import CustomUser

class JWTTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(username='test_user', email='test@example.com', password='testpass')

    def test_jwt_token_obtain(self):
        url = reverse('token_obtain_pair')
        data = {'username': 'test_user', 'password': 'testpass'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)
        self.assertTrue('refresh' in response.data)

    def test_jwt_token_refresh(self):
        refresh = RefreshToken.for_user(self.user)
        url = reverse('token_refresh')
        data = {'refresh': str(refresh)}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)
