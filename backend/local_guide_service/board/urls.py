from django.urls import path
from board.views.post_views import post_list, post_detail, post_like_toggle
from board.views.comment_views import comment_list, comment_delete

urlpatterns = [
    path("posts/", post_list, name="post-list"),
    path("posts/<int:post_id>/", post_detail, name="post-detail"),
    path("posts/<int:post_id>/like/", post_like_toggle, name="post-like-toggle"),

    path("posts/<int:post_id>/comments/", comment_list, name="comment-list"),
    path("comments/<int:comment_id>/", comment_delete, name="comment-delete"),
]