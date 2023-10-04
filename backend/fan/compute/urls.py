from django.contrib import admin
from django.urls import path

import compute.views as cv

urlpatterns = [
    path("0", cv.confirmConnection),
    path("1", cv.predict),
    path("2", cv.downLoadFile)
]