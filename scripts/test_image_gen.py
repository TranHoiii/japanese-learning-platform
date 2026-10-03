import os
import sys
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

# Ensure destination folders exist
fe_base = 'frontend/public/listening'
be_base = 'backend/src/main/resources/static/listening'

def create_illustration_card(out_path, title, label_letter, main_icon, color_theme, subtext=""):
    """
    Creates a clean, high-resolution educational illustration card (600x400)
    for Japanese listening exercises.
    """
    width, height = 600, 400
    img = Image.new('RGB', (width, height), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)

    # Theme colors
    bg_gradient = color_theme.get('bg', (245, 247, 250))
    accent_color = color_theme.get('accent', (16, 185, 129)) # emerald
    header_color = color_theme.get('header', (30, 41, 59))
    box_color = color_theme.get('box', (255, 255, 255))
    border_color = color_theme.get('border', (226, 232, 240))

    # Outer border & background fill
    draw.rectangle([0, 0, width, height], fill=bg_gradient)
    draw.rectangle([10, 10, width-10, height-10], fill=box_color, outline=border_color, width=3)

    # Top accent bar
    draw.rectangle([10, 10, width-10, 50], fill=accent_color)

    # Option Letter Badge (a / b / c / d)
    badge_size = 40
    draw.ellipse([25, 15, 25+badge_size, 15+badge_size], fill=(255, 255, 255))
    draw.text((38, 20), label_letter.upper(), fill=accent_color, font_size=24)

    # Header Title
    draw.text((80, 22), title[:35], fill=(255, 255, 255), font_size=18)

    # Drawing main central visual box
    draw.rounded_rectangle([30, 70, width-30, height-60], radius=15, fill=(248, 250, 252), outline=(203, 213, 225), width=2)

    # Central Icon / Visual Scene Elements
    draw.text((width // 2 - 30, height // 2 - 40), main_icon, fill=header_color, font_size=64)

    # Subtext / Scene Description
    if subtext:
        # Wrap long text nicely
        lines = []
        words = subtext.split()
        curr = ""
        for w in words:
            if len(curr + " " + w) > 40:
                lines.append(curr)
                curr = w
            else:
                curr = (curr + " " + w).strip()
        if curr: lines.append(curr)

        y_pos = height - 110
        for line in lines[:2]:
            draw.text((width // 2 - (len(line)*4), y_pos), line, fill=(51, 65, 85), font_size=16)
            y_pos += 22

    # Footer banner
    draw.rectangle([10, height-40, width-10, height-10], fill=(241, 245, 249))
    draw.text((25, height-32), "Minna no Nihongo N5 Listening Illustration", fill=(100, 116, 139), font_size=13)

    # Save image
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, format='PNG')

print("Illustration helper module ready!")
