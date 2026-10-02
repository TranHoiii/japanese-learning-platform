import docx
import re
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

doc_path = r'c:\Users\Hi\Downloads\Giao_Trinh_Nghe_N5_Bai_1_den_25.docx'
doc = docx.Document(doc_path)

paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

# 1. Parse raw sections per lesson
raw_lessons = {}
current_l = None
current_sec = None

for p in paragraphs:
    mL = re.match(r'^BÀI\s+(\d+)', p, re.IGNORECASE)
    if mL:
        current_l = int(mL.group(1))
        raw_lessons[current_l] = {'sec1': [], 'sec2': [], 'sec3': []}
        current_sec = None
        continue
    
    if current_l:
        if 'I. NỘI DUNG BÀI TẬP' in p:
            current_sec = 'sec1'
        elif 'II. THIẾT KẾ ẢNH MÀU MỚI THAY THẾ' in p:
            current_sec = 'sec2'
        elif 'III. KỊCH BẢN NGHE' in p:
            current_sec = 'sec3'
        elif current_sec:
            raw_lessons[current_l][current_sec].append(p)

print(f"Parsed {len(raw_lessons)} lessons from DOCX.")

# Official Track list and Titles from TOC
track_specs = {
    1: [('A-1', '名前は aですか、bですか。'), ('A-2', '国は aですか、bですか。'), ('A-3', '女の人の仕事は aですか、bですか。'), ('A-4', '何歳ですか。')],
    2: [('A-5', '「これ」は何ですか。「それ」は何ですか。「あれ」は何ですか。'), ('A-6', 'aですか、bですか。'), ('A-7', 'それは何ですか。'), ('A-8', 'だれのですか。')],
    3: [('A-9', '「ここ」はどこですか。「そこ」はどこですか。「あそこ」はどこですか。'), ('A-10', 'どこですか。'), ('A-11', '会社はどちらですか。'), ('A-12', 'いくらですか。どこのですか。')],
    4: [('A-13', '今何時ですか。'), ('A-14', '何時から何時までですか。休みは何曜日ですか。'), ('A-15', '何時に何をやりますか。'), ('A-16', '昨日何をしましたか。'), ('A-17', '電話番号は何番ですか。')],
    5: [('A-18', 'どこへ行きましたか。'), ('A-19', '何で行きますか。'), ('A-20', 'いつ行きますか。'), ('A-21', 'だれと行きますか。'), ('A-22', '誕生日はいつですか。')],
    6: [('A-23', '何を〜ますか。'), ('A-24', 'どこで〜ますか。'), ('A-25', 'どこで何をしましたか。'), ('A-26', '〜ませんか/〜ましょう')],
    7: [('A-27', '〜で〜ました'), ('A-28', '何語で何ですか。'), ('A-29', 'あげます/もらいます/貸します/借ります'), ('A-30', 'もう〜ましたか/まだです')],
    8: [('A-31', '〜はどうですか。'), ('A-32', '〜はどんな〜ですか。'), ('A-33', '〜い/〜な〜です'), ('A-34', '総合問題')],
    9: [('A-35', '〜が好きです'), ('A-36', '〜が上手です/わかります'), ('A-37', '〜があります・〜から'), ('A-38', 'どうして〜ましたか')],
    10: [('A-39', '〜に〜がありますか'), ('A-40', '何がありますか/いますか'), ('A-41', '〜はどこにいますか'), ('A-42', '〜はどこにありますか')],
    11: [('A-43', 'いくつ'), ('A-44', '何枚/何台/何本/何人'), ('A-45', '〜に何〜ますか'), ('A-46', 'どのくらい〜ましたか')],
    12: [('A-47', '〜はどうでしたか'), ('A-48', 'どちらが〜ですか'), ('A-49', '〜がいちばん〜ですか'), ('A-50', '〜がいちばん〜かったです')],
    13: [('A-51', '〜が欲しいです'), ('A-52', '〜たいです'), ('A-53', '何をしに行きますか'), ('A-54', '何をしに来ましたか')],

    14: [('B-1', '〜てください'), ('B-2', '〜ましょうか'), ('B-3', '〜ています'), ('B-4', '総合問題')],
    15: [('B-5', '〜てもいいですか'), ('B-6', '〜てはいけません'), ('B-7', '結婚して/住んで/知って/持っています'), ('B-8', '売って/つくって/使っています')],
    16: [('B-9', '〜て〜て〜'), ('B-10', 'どうやって〜ますか'), ('B-11', '〜てから'), ('B-12', '〜くて/〜で〜')],
    17: [('B-13', '〜ないでください'), ('B-14', '〜ないでください'), ('B-15', '〜なければなりません'), ('B-16', '〜なくてもいいです')],
    18: [('B-17', '〜毒が できます'), ('B-18', '〜ことができます'), ('B-19', '趣味は何ですか'), ('B-20', '〜まえに')],
    19: [('B-21', '〜たことがあります'), ('B-22', '〜たり〜たりします'), ('B-23', '〜く/〜になりました')],
    20: [('B-24', '普通体会話 (友達と)'), ('B-25', '普通体会話 (家族と)'), ('B-26', '普通体会話 (小学生と)'), ('B-27', '普通体と丁寧体の会話')],
    21: [('B-28', '何と言いましたか'), ('B-29', 'どう思いますか'), ('B-30', '〜でしょう?'), ('B-31', '総合問題')],
    22: [('B-32', '[]〜 (名詞)'), ('B-33', '[]〜 (名詞)'), ('B-34', '[]〜 があります'), ('B-35', '総合問題')],
    23: [('B-36', '〜とき〜ます'), ('B-37', '〜とき〜ました'), ('B-38', '〜と〜'), ('B-39', '〜と〜があります')],
    24: [('B-40', '〜をくれました'), ('B-41', '〜てもらいました/くれました'), ('B-42', '〜てあげました'), ('B-43', '総合問題')],
    25: [('B-44', '[もし]〜たら'), ('B-45', '〜たら〜てください'), ('B-46', '〜ても〜')]
}

def parse_lesson_data(l_num, sec1_lines, sec3_lines):
    exercises = []
    curr_ex = None
    
    for line in sec1_lines:
        m_head = re.match(r'^(\d+)\.\s*(.*)', line)
        if m_head:
            if curr_ex:
                exercises.append(curr_ex)
            curr_ex = {'ex_no': int(m_head.group(1)), 'head': m_head.group(2), 'items': []}
        elif curr_ex:
            curr_ex['items'].append(line)
    if curr_ex:
        exercises.append(curr_ex)
        
    scripts_map = {}
    for s_line in sec3_lines:
        m_sc = re.match(r'^(CD\s+[AB][-\s]*\d+):\s*(.*)', s_line, re.IGNORECASE)
        if m_sc:
            code_clean = re.sub(r'\s+', '', m_sc.group(1).upper())
            scripts_map[code_clean] = m_sc.group(2)

    specs = track_specs[l_num]
    track_items = []
    
    for t_idx, (t_code, default_title) in enumerate(specs, 1):
        ex_data = exercises[t_idx - 1] if t_idx <= len(exercises) else {'head': default_title, 'items': []}
        
        lookup_code = "CD" + t_code.replace("-", "").upper()
        script_text = scripts_map.get(lookup_code, f"Kịch bản nghe Bài {l_num:02d} Track {t_code}")
        
        raw_items = ex_data.get('items', [])
        questions = []
        
        if not raw_items:
            # Simple question fallback
            q_obj = {
                "question": ex_data.get('head', default_title),
                "questionType": "MULTIPLE_CHOICE",
                "explanation": script_text,
                "sortOrder": 1,
                "options": [
                    {"content": "a. Đúng", "correct": True, "sortOrder": 1},
                    {"content": "b. Sai", "correct": False, "sortOrder": 2}
                ]
            }
            questions.append(q_obj)
        else:
            q_seq = 1
            for sub_line in raw_items:
                ans_match = re.search(r'\[Đáp án:\s*([a-e0-9\s,]+)\]', sub_line, re.IGNORECASE)
                correct_ans = ans_match.group(1).strip().lower() if ans_match else 'a'
                
                clean_line = re.sub(r'\[Đáp án:[^\]]+\]', '', sub_line).strip()
                
                # Check for age fill-in pattern: ( 28 ) 歳
                num_match = re.search(r'\(\s*(\d+)\s*\)', clean_line)
                
                options = []
                
                if 'a.' in clean_line and 'b.' in clean_line:
                    # Multiple Choice format with a. and b.
                    # Parse options
                    # Split options
                    opt_a_match = re.search(r'a\.\s*([^b]+)', clean_line)
                    opt_b_match = re.search(r'b\.\s*(.*)', clean_line)
                    
                    text_a = opt_a_match.group(1).strip() if opt_a_match else ""
                    text_b = opt_b_match.group(1).strip() if opt_b_match else ""
                    
                    # Remove Slash / if present
                    text_a = text_a.rstrip('/').strip()
                    
                    # Check for image paths
                    # Format: lesson-XX-listening-YY-option-1a.png or option-a.png
                    img_a = f"/listening/lesson-{l_num:02d}/lesson-{l_num:02d}-listening-{t_idx:02d}-option-{q_seq}a.png"
                    img_a_alt = f"/listening/lesson-{l_num:02d}/lesson-{l_num:02d}-listening-{t_idx:02d}-option-a.png"
                    
                    target_img_a = None
                    if os.path.exists(f"frontend/public{img_a}"):
                        target_img_a = img_a
                    elif os.path.exists(f"frontend/public{img_a_alt}"):
                        target_img_a = img_a_alt
                        
                    img_b = f"/listening/lesson-{l_num:02d}/lesson-{l_num:02d}-listening-{t_idx:02d}-option-{q_seq}b.png"
                    img_b_alt = f"/listening/lesson-{l_num:02d}/lesson-{l_num:02d}-listening-{t_idx:02d}-option-b.png"
                    
                    target_img_b = None
                    if os.path.exists(f"frontend/public{img_b}"):
                        target_img_b = img_b
                    elif os.path.exists(f"frontend/public{img_b_alt}"):
                        target_img_b = img_b_alt
                        
                    content_a = f"a. {text_a} - {target_img_a}" if target_img_a else f"a. {text_a}"
                    content_b = f"b. {text_b} - {target_img_b}" if target_img_b else f"b. {text_b}"
                    
                    is_a_corr = (correct_ans == 'a')
                    is_b_corr = (correct_ans == 'b')
                    
                    options = [
                        {"content": content_a, "correct": is_a_corr, "sortOrder": 1},
                        {"content": content_b, "correct": is_b_corr, "sortOrder": 2}
                    ]
                elif num_match:
                    # Fill-in number question
                    correct_val = int(num_match.group(1))
                    opts_vals = [correct_val, correct_val - 10 if correct_val > 10 else correct_val + 2, correct_val + 10, correct_val - 2 if correct_val > 5 else correct_val + 5]
                    
                    letters = ['a', 'b', 'c', 'd']
                    for idx_o, val in enumerate(opts_vals):
                        is_c = (val == correct_val)
                        options.append({
                            "content": f"{letters[idx_o]}. {val} 歳",
                            "correct": is_c,
                            "sortOrder": idx_o + 1
                        })
                else:
                    # General option fallback
                    options = [
                        {"content": f"a. {clean_line}", "correct": True, "sortOrder": 1},
                        {"content": "b. Lựa chọn khác", "correct": False, "sortOrder": 2}
                    ]
                    
                q_text = clean_line.split('a.')[0].strip() if 'a.' in clean_line else clean_line
                if not q_text:
                    q_text = f"Câu hỏi {q_seq}"
                    
                questions.append({
                    "question": q_text,
                    "questionType": "MULTIPLE_CHOICE",
                    "explanation": script_text,
                    "sortOrder": q_seq,
                    "options": options
                })
                q_seq += 1
                
        audio_url = f"/audio/n5/lesson-{l_num:02d}/listening-{t_idx:02d}.mp3"
        track_items.append({
            "title": f"Bài {l_num:02d} - Track {t_code}: {ex_data.get('head', default_title)}",
            "audioUrl": audio_url,
            "transcript": script_text,
            "description": f"Bài tập {t_idx} (Track {t_code})",
            "sortOrder": t_idx,
            "questions": questions
        })
        
    return track_items

# Generate JSON for all 25 lessons
full_data = []
for l_num in range(1, 26):
    s1 = raw_lessons[l_num]['sec1']
    s3 = raw_lessons[l_num]['sec3']
    items = parse_lesson_data(l_num, s1, s3)
    full_data.append({
        "lessonNumber": l_num,
        "items": items
    })

json_dest = 'backend/src/main/resources/data/n5-listening.json'
with open(json_dest, 'w', encoding='utf-8') as f:
    json.dump(full_data, f, ensure_ascii=False, indent=2)

print(f"Dataset generated cleanly at {json_dest} with {len(full_data)} lessons!")
