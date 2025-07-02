import os
from PIL import Image


def create_path_for_smaller_image(input_path):
    """Creates a path for a smaller image"""
    directory = os.path.dirname(input_path).lstrip('/')
    filename = os.path.basename(input_path)
    name, ext = os.path.splitext(filename)
    return os.path.join(directory, f"{name}_small{ext}")

def resize_image(img_path: str, size: tuple):
    """Resize image to desired size"""
    img = Image.open(img_path)
    img.thumbnail(size)
    path_to_smaller = create_path_for_smaller_image(img_path)
    img.save(path_to_smaller)

# Example usage
# if __name__ == "__main__":
#     resize_image("C:/GIT_repo/testops-dashboard-tests/frontend/static/project_logo.png", (256,256))
