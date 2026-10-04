import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminLevelApi } from "../../services/adminLevelApi";
import { adminLessonApi } from "../../services/adminLessonApi";
import { adminVocabularyApi } from "../../services/adminVocabularyApi";
import { adminGrammarApi } from "../../services/adminGrammarApi";
import { adminKanjiApi } from "../../services/adminKanjiApi";
import { adminListeningApi } from "../../services/adminListeningApi";
import { adminReadingApi } from "../../services/adminReadingApi";
import { adminExerciseApi } from "../../services/adminExerciseApi";

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    levels: 0,
    lessons: 0,
    vocabularies: 0,
    grammars: 0,
    kanjis: 0,
    listenings: 0,
    readings: 0,
    exercises: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          levels,
          lessons,
          vocabularies,
          grammars,
          kanjis,
          listenings,
          readings,
          exercises,
        ] = await Promise.allSettled([
          adminLevelApi.getAll(),
          adminLessonApi.getLessons(),
          adminVocabularyApi.getVocabularies(),
          adminGrammarApi.getGrammars(),
          adminKanjiApi.getAll(),
          adminListeningApi.getListenings(),
          adminReadingApi.getReadings(),
          adminExerciseApi.getExercises(),
        ]);

        setStats({
          levels: levels.status === "fulfilled" ? levels.value.length : 0,
          lessons: lessons.status === "fulfilled" ? lessons.value.length : 0,
          vocabularies: vocabularies.status === "fulfilled" ? vocabularies.value.length : 0,
          grammars: grammars.status === "fulfilled" ? grammars.value.length : 0,
          kanjis: kanjis.status === "fulfilled" ? kanjis.value.length : 0,
          listenings: listenings.status === "fulfilled" ? listenings.value.length : 0,
          readings: readings.status === "fulfilled" ? readings.value.length : 0,
          exercises: exercises.status === "fulfilled" ? exercises.value.length : 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    { title: "Cấp độ (Levels)", count: stats.levels, link: "/admin/levels", color: "from-blue-600 to-indigo-600" },
    { title: "Bài học (Lessons)", count: stats.lessons, link: "/admin/lessons", color: "from-indigo-600 to-purple-600" },
    { title: "Từ vựng (Vocabularies)", count: stats.vocabularies, link: "/admin/vocabularies", color: "from-emerald-600 to-teal-600" },
    { title: "Ngữ pháp (Grammars)", count: stats.grammars, link: "/admin/grammars", color: "from-amber-500 to-orange-600" },
    { title: "Chữ Hán (Kanjis)", count: stats.kanjis, link: "/admin/kanjis", color: "from-rose-500 to-pink-600" },
    { title: "Luyện nghe (Listenings)", count: stats.listenings, link: "/admin/listenings", color: "from-cyan-600 to-blue-600" },
    { title: "Luyện đọc (Readings)", count: stats.readings, link: "/admin/readings", color: "from-violet-600 to-purple-600" },
    { title: "Bài tập (Exercises)", count: stats.exercises, link: "/admin/exercises", color: "from-fuchsia-600 to-rose-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Tổng quan quản trị nội dung</h2>
        <p className="text-sm text-slate-500 mt-1">
          Hệ thống CMS quản lý toàn bộ dữ liệu học tập tiếng Nhật (N5 - N1).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link
            key={c.title}
            to={c.link}
            className="group relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${c.color} text-white flex items-center justify-center font-bold text-sm shadow-xs mb-4`}>
              {c.title.charAt(0)}
            </div>
            <div className="text-2xl font-black text-slate-800">
              {loading ? (
                <div className="w-12 h-7 bg-slate-200 animate-pulse rounded"></div>
              ) : (
                c.count
              )}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1 group-hover:text-indigo-600 transition-colors">
              {c.title} →
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-800 mb-2">Chính sách bảo vệ dữ liệu CMS V1</h3>
        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
          <li><strong>An toàn khi xóa (Delete Safety):</strong> Không cho phép xóa Level nếu còn Lesson; không cho phép xóa Lesson nếu còn nội dung học liên kết.</li>
          <li><strong>Quản lý đáp án:</strong> Chỉ tài khoản ADMIN mới có quyền truy cập, tạo, sửa và xem trạng thái đúng/sai của câu hỏi và lựa chọn.</li>
          <li><strong>Ẩn/hiện nội dung:</strong> Sử dụng cờ <code>isActive</code> để ẩn nội dung chưa hoàn thiện thay vì xóa cứng.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
