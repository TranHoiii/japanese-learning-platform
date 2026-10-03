import os
import shutil
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Audio Source Directories
cd1_dir = r'd:\tổng hợp tài liệu N5\初級I　第2版　(第1課～第13課)'
cd2_dir = r'd:\tổng hợp tài liệu N5\初級I　第2版　(第14課～第25課)'

cd1_files = sorted([f for f in os.listdir(cd1_dir) if f.endswith('.mp3')])
cd2_files = sorted([f for f in os.listdir(cd2_dir) if f.endswith('.mp3')])

# Define exact TOC structure: lesson_no -> list of (track_code, source_mp3_filename, toc_title)
lesson_tracks_spec = {
    1: [('A-1', cd1_files[0], '名は ~です'),
        ('A-2', cd1_files[1], '~から 来ました'),
        ('A-3', cd1_files[2], 'わたしは ~の ~です'),
        ('A-4', cd1_files[3], '~歳です')],
    2: [('A-5', cd1_files[4], 'これ/それ/あれは 何ですか'),
        ('A-6', cd1_files[5], '~ですか ~ですか'),
        ('A-7', cd1_files[6], '何の ~ですか'),
        ('A-8', cd1_files[7], 'だれのですか')],
    3: [('A-9', cd1_files[8], 'ここ/そこ/あそこは ~です'),
        ('A-10', cd1_files[9], '~は どこですか'),
        ('A-11', cd1_files[10], 'お国/会社は どちらですか'),
        ('A-12', cd1_files[11], 'いくらですか・どこのですか')],
    4: [('A-13', cd1_files[12], '何時ですか'),
        ('A-14', cd1_files[13], '何時から 何時までですか'),
        ('A-15', cd1_files[14], '~時に ~ます'),
        ('A-16', cd1_files[15], '~ました/~ませんでした'),
        ('A-17', cd1_files[16], '電話番号は 何番ですか')],
    5: [('A-18', cd1_files[17], 'どこへ 行きましたか'),
        ('A-19', cd1_files[18], '何で 行きますか'),
        ('A-20', cd1_files[19], 'いつ 行きますか'),
        ('A-21', cd1_files[20], 'だれと 行きますか'),
        ('A-22', cd1_files[21], '誕生日は いつですか')],
    6: [('A-23', cd1_files[22], '何を ~ますか'),
        ('A-24', cd1_files[23], 'どこで ~ますか'),
        ('A-25', cd1_files[24], 'どこで 何を しましたか'),
        ('A-26', cd1_files[25], '~ませんか/~ましょう')],
    7: [('A-27', cd1_files[26], '~で ~ました'),
        ('A-28', cd1_files[27], '何語で 何ですか'),
        ('A-29', cd1_files[28], 'あげます/もらいます/貸します/借ります'),
        ('A-30', cd1_files[29], 'もう ~ました/まだです')],
    8: [('A-31', cd1_files[30], '~は どうですか'),
        ('A-32', cd1_files[31], '~は どんな ~ですか'),
        ('A-33', cd1_files[32], '~い/~な ~です'),
        ('A-34', cd1_files[33], '総合問題')],
    9: [('A-35', cd1_files[34], '~が 好きです'),
        ('A-36', cd1_files[35], '~が 上手です/わかります'),
        ('A-37', cd1_files[36], '~が あります・~から'),
        ('A-38', cd1_files[37], 'どうして ~ましたか')],
    10: [('A-39', cd1_files[38], '~に ~が ありますか'),
         ('A-40', cd1_files[39], '何が ありますか/いますか'),
         ('A-41', cd1_files[40], '~は どこに いますか'),
         ('A-42', cd1_files[41], '~は どこに ありますか')],
    11: [('A-43', cd1_files[42], 'いくつ'),
         ('A-44', cd1_files[43], '何枚/何台/何本/何人'),
         ('A-45', cd1_files[44], '~に 何 ~ますか'),
         ('A-46', cd1_files[45], 'どのくらい ~ましたか')],
    12: [('A-47', cd1_files[46], '~は どうでしたか'),
         ('A-48', cd1_files[47], 'どちらが ~ですか'),
         ('A-49', cd1_files[48], '~が いちばん ~ですか'),
         ('A-50', cd1_files[49], '~が いちばん ~かったです')],
    13: [('A-51', cd1_files[50], '~が 欲しいです'),
         ('A-52', cd1_files[51], '~たいです'),
         ('A-53', cd1_files[52], '何を しに 行きますか'),
         ('A-54', cd1_files[53], '何を しに 来ましたか')],

    14: [('B-1', cd2_files[0], '~て ください'),
         ('B-2', cd2_files[1], '~ましょうか'),
         ('B-3', cd2_files[2], '~て います'),
         ('B-4', cd2_files[3], '総合問題')],
    15: [('B-5', cd2_files[4], '~ても いいですか'),
         ('B-6', cd2_files[5], '~ては いけません'),
         ('B-7', cd2_files[6], '結婚して/住んで/知って/持っています'),
         ('B-8', cd2_files[7], '売って/つくって/使っています')],
    16: [('B-9', cd2_files[8], '~て ~て ~'),
         ('B-10', cd2_files[9], 'どうやって ~ますか'),
         ('B-11', cd2_files[10], '~てから'),
         ('B-12', cd2_files[11], '~くて/~で ~')],
    17: [('B-13', cd2_files[12], '~ないで ください'),
         ('B-14', cd2_files[13], '~ないで ください'),
         ('B-15', cd2_files[14], '~なければ なりません'),
         ('B-16', cd2_files[15], '~なくても いいです')],
    18: [('B-17', cd2_files[16], '~ことが できます'),
         ('B-18', cd2_files[17], '~ことが できます'),
         ('B-19', cd2_files[18], '趣味は 何ですか'),
         ('B-20', cd2_files[19], '~ まえに')],
    19: [('B-21', cd2_files[20], '~た ことが あります'),
         ('B-22', cd2_files[21], '~たり ~たり します'),
         ('B-23', cd2_files[22], '~く/~に なりました')],
    20: [('B-24', cd2_files[23], '普通体会話 (友達と)'),
         ('B-25', cd2_files[24], '普通体会話 (家族と)'),
         ('B-26', cd2_files[25], '普通体会話 (小学生と)'),
         ('B-27', cd2_files[26], '普通体と丁寧体の会話')],
    21: [('B-28', cd2_files[27], '何と言いましたか'),
         ('B-29', cd2_files[28], 'どう 思いますか'),
         ('B-30', cd2_files[29], '~でしょう?'),
         ('B-31', cd2_files[30], '総合問題')],
    22: [('B-32', cd2_files[31], '[]~ (名詞)'),
         ('B-33', cd2_files[32], '[]~ (名詞)'),
         ('B-34', cd2_files[33], '[]~ が あります'),
         ('B-35', cd2_files[34], '総合問題')],
    23: [('B-36', cd2_files[35], '~とき ~ます'),
         ('B-37', cd2_files[36], '~とき ~ました'),
         ('B-38', cd2_files[37], '~と ~'),
         ('B-39', cd2_files[38], '~と ~が あります')],
    24: [('B-40', cd2_files[39], '~を くれました'),
         ('B-41', cd2_files[40], '~て もらいました/くれました'),
         ('B-42', cd2_files[41], '~て あげました'),
         ('B-43', cd2_files[42], '総合問題')],
    25: [('B-44', cd2_files[43], '[もし] ~たら'),
         ('B-45', cd2_files[44], '~たら ~て ください'),
         ('B-46', cd2_files[45], '~ても ~')]
}

# 1. Load existing JSON items in order (100 total items)
with open('backend/src/main/resources/data/n5-listening.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

all_items = []
for lesson in raw_data:
    for item in lesson['items']:
        all_items.append(item)

print(f"Loaded {len(all_items)} total items from n5-listening.json")

# 2. Build new structured JSON according to lesson_tracks_spec
new_json_structure = []
item_cursor = 0

fe_audio_base = 'frontend/public/audio/n5'
be_audio_base = 'backend/src/main/resources/static/audio/n5'

for lesson_no in range(1, 26):
    specs = lesson_tracks_spec[lesson_no]
    lesson_items = []

    # Directories for audio
    fe_dir = os.path.join(fe_audio_base, f'lesson-{lesson_no:02d}')
    be_dir = os.path.join(be_audio_base, f'lesson-{lesson_no:02d}')

    # Recreate clean directories to avoid orphaned files
    if os.path.exists(fe_dir):
        shutil.rmtree(fe_dir)
    os.makedirs(fe_dir, exist_ok=True)

    if os.path.exists(be_dir):
        shutil.rmtree(be_dir)
    os.makedirs(be_dir, exist_ok=True)

    for track_idx, (track_code, source_mp3_name, toc_title) in enumerate(specs, 1):
        item = all_items[item_cursor]
        item_cursor += 1

        target_audio_filename = f'listening-{track_idx:02d}.mp3'
        audio_relative_url = f'/audio/n5/lesson-{lesson_no:02d}/{target_audio_filename}'

        # Source MP3 file path
        if track_code.startswith('A-'):
            src_mp3 = os.path.join(cd1_dir, source_mp3_name)
        else:
            src_mp3 = os.path.join(cd2_dir, source_mp3_name)

        # Copy audio file to frontend and backend
        fe_target_path = os.path.join(fe_dir, target_audio_filename)
        be_target_path = os.path.join(be_dir, target_audio_filename)

        shutil.copy2(src_mp3, fe_target_path)
        shutil.copy2(src_mp3, be_target_path)

        # Update item fields
        item['title'] = f"Bài {lesson_no:02d} - Track {track_code}: {toc_title}"
        item['audioUrl'] = audio_relative_url
        item['sortOrder'] = track_idx

        # Ensure question sortOrder as well
        if 'questions' in item and item['questions']:
            for q_idx, q in enumerate(item['questions'], 1):
                q['sortOrder'] = q_idx
                if 'options' in q and q['options']:
                    for o_idx, o in enumerate(q['options'], 1):
                        o['sortOrder'] = o_idx

        lesson_items.append(item)

    new_json_structure.append({
        "lessonNumber": lesson_no,
        "items": lesson_items
    })

# Save aligned JSON file
with open('backend/src/main/resources/data/n5-listening.json', 'w', encoding='utf-8') as f:
    json.dump(new_json_structure, f, ensure_ascii=False, indent=2)

print("Alignment completed successfully with explicit sortOrder!")
