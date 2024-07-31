# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Course
# from django.db.models import Q
# from .serializers import CourseSerializer

# @api_view(['GET'])
# def get_all_courses(request):
#     courses = Course.objects.filter(is_active=True) 
#     serializer = CourseSerializer(courses, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def get_course(request, id):
#     try:
#         course = Course.objects.get(id=id)
#     except Course.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     serializer = CourseSerializer(course)
#     return Response(serializer.data)

# @api_view(['GET'])
# def search_courses_by_category(request):
#     course_types = request.query_params.getlist('course_type')
#     terms = request.query_params.getlist('term')
#     if not course_types and not terms:
#         return Response({"detail": "Category query parameters are required."}, status=status.HTTP_400_BAD_REQUEST)

#     query = Q()
#     if course_types:
#         course_type_query = Q()
#         for course_type in course_types:
#             course_type_query |= Q(course_type__iexact=course_type)
#         query &= course_type_query

#     if terms:
#         terms_query = Q()
#         for term in terms:
#             terms_query |= Q(term__iexact=term)
#         query &= terms_query

#     courses = Course.objects.filter(query)
#     serializer = CourseSerializer(courses, many=True)
#     return Response(serializer.data)
