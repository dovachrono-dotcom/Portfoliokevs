from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "contact"
REVIEW = ROOT / "review"
OUTPUT.mkdir(parents=True, exist_ok=True)
REVIEW.mkdir(parents=True, exist_ok=True)

for theme in ("light", "dark"):
    source = Image.open(ROOT / "source" / f"pointer-{theme}.png").convert("RGB")
    rgb = np.asarray(source).astype(np.float32)
    red, green, blue = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    excess = green - np.maximum(red, blue)
    background = (green > 65) & (excess > 24) & (green > red * 1.14) & (green > blue * 1.14)
    alpha = np.where(background, 0, 255).astype(np.uint8)
    rgb[..., 1] = np.minimum(green, np.maximum(red, blue) + 2)
    rgba = Image.fromarray(np.dstack((rgb.astype(np.uint8), alpha)), "RGBA")
    size = (round(source.width * 900 / source.height), 900)
    rgba = rgba.resize(size, Image.Resampling.LANCZOS)
    matte = rgba.getchannel("A").filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.35))
    rgba.putalpha(matte)
    rgba.save(OUTPUT / f"pointer-{theme}.webp", "WEBP", quality=94, method=6, alpha_quality=100)

    preview = Image.new("RGB", (size[0] * 2, size[1]))
    for index, color in enumerate(("#f6f7f8", "#0b0c0f")):
        ground = Image.new("RGBA", size, color)
        ground.alpha_composite(rgba)
        preview.paste(ground.convert("RGB"), (index * size[0], 0))
    preview.save(REVIEW / f"pointer-{theme}-composites.png")

    edge_review = Image.new("RGB", (840, 600), "#777777")
    crops = ((270, 55, 435, 200), (60, 215, 225, 360))
    for row, box in enumerate(crops):
        crop = rgba.crop(box).resize((330, 290), Image.Resampling.NEAREST)
        for col, color in enumerate(("#f6f7f8", "#0b0c0f")):
            ground = Image.new("RGBA", crop.size, color)
            ground.alpha_composite(crop)
            edge_review.paste(ground.convert("RGB"), (col * 420, row * 300))
    edge_review.save(REVIEW / f"pointer-{theme}-edges.png")
    print(f"{theme}: {source.size} -> {size}, transparent WebP, 1px matte erosion and green despill")
