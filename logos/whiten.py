from PIL import Image
import glob
for f in glob.glob("*.png"):
    im = Image.open(f).convert("RGBA")
    bg = Image.new("RGBA", im.size, "white")
    bg.alpha_composite(im)
    bg.convert("RGB").save(f)
