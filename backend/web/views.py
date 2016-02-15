from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http import HttpResponse
from web.modules.questionSerializer import QuestionSerializer
from web.modules.jsonResponse import JSONResponse
from web.models import Question
from django.contrib.auth.models import User
from django.conf import settings

@api_view(['GET', 'POST'])
def question_list(request):
    if request.method == 'GET':
        snippets = Question.objects.all()
        serializer = QuestionSerializer(snippets, many=True)
        return JSONResponse(serializer.data, status=200)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = QuestionSerializer(data=data)

        if serializer.is_valid():
            if request.user.is_authenticated():
                user_id = request.user
            else:
                user_id = settings.DEFAULT_USER

            user = User.objects.get(id=user_id)
            serializer.save(author = user)
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def question_detail(request, id):
    if request.method == 'GET':
        snippets = Question.objects.get(id=id)
        serializer = QuestionSerializer(snippets)
        return JSONResponse(serializer.data, status = 200)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        snippets = Question.objects.get(id=id)
        serializer = QuestionSerializer(snippets, data=data)
        if serializer.is_valid():
            user = User.objects.get(username=data['author'])
            serializer.save(author = user)
            return JSONResponse(serializer.data, status=200)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippets = Question.objects.get(id=id)
        snippets.delete()
        return HttpResponse(id, status=200)