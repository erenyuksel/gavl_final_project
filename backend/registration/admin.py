from django.contrib import admin
from registration.models import Token


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)
    list_display = ('user', 'refresh', 'access')
    ordering = ('user',)
