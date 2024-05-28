from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist
import random


def duplicate_entity(model_name, entity_id):
    try:
        model = apps.get_model('event', model_name)
        entity = model.objects.get(pk=entity_id)

        entity.pk = None
        entity.name = entity.name + ", copy" + str(random.randint(1, 100))
        entity.save()
        return entity

    except ObjectDoesNotExist:
        return None
