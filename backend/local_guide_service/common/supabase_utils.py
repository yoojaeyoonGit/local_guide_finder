import io
import uuid

from PIL import Image
from supabase import create_client
from django.conf import settings

_supabase = None


def get_supabase():
    global _supabase
    if _supabase is None:
        _supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_SECRET_KEY)
    return _supabase


def upload_image_to_supabase(file, folder="images"):
    filename = f"{folder}/{uuid.uuid4()}.webp"
    client = get_supabase()

    image = Image.open(file)
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")
    buffer = io.BytesIO()
    image.save(buffer, format="WEBP", quality=85)
    buffer.seek(0)

    client.storage.from_(settings.SUPABASE_BUCKET).upload(
        filename,
        buffer.read(),
        {"content-type": "image/webp"},
    )

    return client.storage.from_(settings.SUPABASE_BUCKET).get_public_url(filename)


def delete_file_from_supabase(public_url):
    client = get_supabase()
    base_url = client.storage.from_(settings.SUPABASE_BUCKET).get_public_url("")
    file_path = public_url.replace(base_url, "")
    if file_path:
        client.storage.from_(settings.SUPABASE_BUCKET).remove([file_path])
