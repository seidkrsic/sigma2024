from rest_framework.response import Response
from rest_framework import status
from .models import Course
from django.db.models import Q
from .serializers import CourseSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Problem
from .serializers import ProblemSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Problem, Solution
from .models import Post
from .serializers import PostSerializer
from django.shortcuts import get_object_or_404
from django.http import FileResponse, Http404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly




class PostPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# courses_app/views.py
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer

class PostPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def post_list_create(request):
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-published_date')
        
        # Ako postoji 'exclude' parametar, isključi taj članak
        exclude_id = request.query_params.get('exclude', None)
        if exclude_id:
            try:
                exclude_id = int(exclude_id)
                posts = posts.exclude(id=exclude_id)
            except ValueError:
                return Response({'error': 'Invalid exclude parameter'}, status=400)
        
        paginator = PostPagination()
        page = paginator.paginate_queryset(posts, request)
        serializer = PostSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user.profile)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)





@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)
    elif request.method == 'PUT':
        if post.author != request.user.profile:
            return Response({'detail': 'Nemate dozvolu da izmenite ovaj članak.'}, status=403)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        if post.author != request.user.profile:
            return Response({'detail': 'Nemate dozvolu da obrišete ovaj članak.'}, status=403)
        post.delete()
        return Response(status=204)







@api_view(['GET'])
@permission_classes([AllowAny])
def problem_list(request):
    problems = Problem.objects.filter(is_active=False).order_by('-published_date')

    # Paginacija
    paginator = PageNumberPagination()
    paginator.page_size = 10  # Broj problema po stranici
    result_page = paginator.paginate_queryset(problems, request)

    serializer = ProblemSerializer(result_page, many=True, context={'request': request})

    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def problem_solution_file(request, pk):
    problem = get_object_or_404(Problem, pk=pk)

    if not problem.solution_file:
        raise Http404('Problem nema priloženo rešenje.')

    response = FileResponse(problem.solution_file.open('rb'), content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="{problem.solution_file.name}"'
    return response




@api_view(['GET'])
@permission_classes([AllowAny])
def problem_file(request, pk):
    problem = get_object_or_404(Problem, pk=pk)

    if not problem.problem_file:
        raise Http404('Problem nema priložen fajl.')

    response = FileResponse(problem.problem_file.open('rb'), content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="{problem.problem_file.name}"'
    return response




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_solution(request):
    profile = request.user.profile
    problem_id = request.data.get('problem')
    submitted_solution = request.data.get('submitted_solution')

    if not problem_id or submitted_solution is None:
        return Response({'detail': 'Problem ID i rešenje su obavezni.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        problem = Problem.objects.get(id=problem_id)
    except Problem.DoesNotExist:
        return Response({'detail': 'Problem ne postoji.'}, status=status.HTTP_400_BAD_REQUEST)

    # Provera da li je korisnik već poslao rešenje za ovaj problem
    if Solution.objects.filter(profile=profile, problem=problem).exists():
        return Response({'detail': 'Već ste poslali rešenje za ovaj problem.'}, status=status.HTTP_400_BAD_REQUEST)

    # Provera da li je uneto rešenje integer
    try:
        submitted_solution = int(submitted_solution)
    except ValueError:
        return Response({'detail': 'Rešenje mora biti broj.'}, status=status.HTTP_400_BAD_REQUEST)

    # Provera da li je rešenje tačno
    is_correct = False
    if problem.solution is not None:
        is_correct = (submitted_solution == problem.solution)

    solution = Solution.objects.create(
        profile=profile,
        problem=problem,
        submitted_solution=submitted_solution,
        is_correct=is_correct
    )

    return Response({'message': 'Vaše rešenje je uspešno poslato!', 'is_correct': is_correct}, status=status.HTTP_201_CREATED)





@api_view(['GET'])
@permission_classes([AllowAny])
def current_problem(request):
    problem = Problem.objects.filter(is_active=True).order_by('-published_date').first()
    if problem:
        serializer = ProblemSerializer(problem, context={'request': request})
        return Response(serializer.data)
    else:
        return Response({'detail': 'Trenutno nema aktivnog problema.'}, status=404)





@api_view(['GET'])
def get_all_courses(request):
    courses = Course.objects.filter(is_active=True) 
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
    terms = request.query_params.getlist('term')
    if not course_types and not terms:
        return Response({"detail": "Category query parameters are required."}, status=status.HTTP_400_BAD_REQUEST)

    query = Q()
    if course_types:
        course_type_query = Q()
        for course_type in course_types:
            course_type_query |= Q(course_type__iexact=course_type)
        query &= course_type_query

    if terms:
        terms_query = Q()
        for term in terms:
            terms_query |= Q(term__iexact=term)
        query &= terms_query

    courses = Course.objects.filter(query)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)
