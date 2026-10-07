from data_part1 import get_lessons_26_to_34
from data_part2 import get_lessons_35_to_42
from data_part3 import get_lessons_43_to_50

def get_all_n4_lessons():
    all_lessons = []
    all_lessons.extend(get_lessons_26_to_34())
    all_lessons.extend(get_lessons_35_to_42())
    all_lessons.extend(get_lessons_43_to_50())
    return all_lessons
