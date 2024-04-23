from django.contrib import admin
from .models import User, Organisation
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
    list_display = ('email', 'first_name', 'last_name', 'organisation', 'created_date')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'avatar')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions', 'role')}),
        ('Important dates', {'fields': ('last_login', 'created_date')}),
        ('Additional info', {'fields': ('organisation', )}),
    )
    ordering = ('email',)


class UserInline(admin.TabularInline):
    model = User
    fields = ('username', 'email', 'role')  # Add more fields as necessary
    extra = 0  # No extra empty forms


@admin.register(Organisation)
class OrganisationAdmin(admin.ModelAdmin):
    list_display = ('name', 'logo')
    inlines = [UserInline]
