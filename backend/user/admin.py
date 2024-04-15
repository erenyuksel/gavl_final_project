from django.contrib import admin
from .models import User, Organisation, UserAuthority
from django.contrib.auth.admin import UserAdmin


@admin.register(User)
class UserAdmin(UserAdmin):
    readonly_fields = ('created_date',)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')}
         ),
    )
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'avatar', 'organisation')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions', 'user_authority')}),
        ('Important dates', {'fields': ('last_login', 'created_date')})
    )
    list_display = ('email', 'first_name', 'last_name', 'organisation', 'created_date')
    ordering = ('email',)


@admin.register(Organisation)
class OrganisationAdmin(admin.ModelAdmin):
    list_display = ('name', 'logo')


@admin.register(UserAuthority)
class OrganisationAdmin(admin.ModelAdmin):
    list_display = ('role',)
