from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from django.db.models import Q
from .serializers import CourseSerializer

@api_view(['GET'])
def get_all_courses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_course(request, id):
    try:
        course = Course.objects.get(id=id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = CourseSerializer(course)
    return Response(serializer.data)

@api_view(['GET'])
def search_courses_by_category(request):
    course_types = request.query_params.getlist('course_type')
    levels = request.query_params.getlist('level')
    school_types = request.query_params.getlist('school_type')
    if not course_types and not levels and not school_types:
        return Response({"detail": "Category query parameters are required."}, status=status.HTTP_400_BAD_REQUEST)

    query = Q()
    if course_types:
        course_type_query = Q()
        for course_type in course_types:
            course_type_query |= Q(course_type__iexact=course_type)
        query &= course_type_query

    if levels:
        level_query = Q()
        for level in levels:
            level_query |= Q(level__iexact=level)
        query &= level_query

    if school_types:
        school_type_query = Q()
        for school_type in school_types:
            school_type_query |= Q(school_type__iexact=school_type)
        query &= school_type_query

    courses = Course.objects.filter(query)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)
