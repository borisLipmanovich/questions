from rest_framework import serializers
from web.models import Question

class QuestionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=False, allow_blank=True, max_length=120)
    description = serializers.CharField(required=False, allow_blank=True, max_length=120)
    author = serializers.CharField(required=False, allow_blank=True, max_length=120)

    def create(self, validated_data):
        return Question.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.author = validated_data.get('author', instance.author)
        instance.save()
        return instance