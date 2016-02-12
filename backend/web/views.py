from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http import HttpResponse
from web.modules.questionSerializer import QuestionSerializer
from web.modules.jsonResponse import JSONResponse
from web.models import Question

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
            serializer.author = request.user
            serializer.save()
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
            serializer.author = request.user
            serializer.save()
            return JSONResponse(serializer.data, status=200)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippets = Question.objects.get(id=id)
        snippets.delete()
        return HttpResponse(status=200)