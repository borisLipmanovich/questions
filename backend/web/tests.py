from django.test import TestCase
from django.test import Client

# Create your tests here.

class QuestionTestCase(TestCase):
    def testGetQuestions(self):
        c = Client()
        response = c.get('/questions/')
        self.assertEqual(response.status_code, 200)