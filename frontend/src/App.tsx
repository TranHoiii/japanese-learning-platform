import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import GlobalHorizontalScroll from "./components/GlobalHorizontalScroll";
import RequireAdmin from "./components/RequireAdmin";

// Lazy-loaded Pages (Code Splitting per Route)
const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const LessonsPage = React.lazy(() => import("./pages/LessonsPage"));
const VocabularyPage = React.lazy(() => import("./pages/VocabularyPage"));
const VocabularyDetailPage = React.lazy(() => import("./pages/VocabularyDetailPage"));
const GrammarPage = React.lazy(() => import("./pages/GrammarPage"));
const GrammarDetailPage = React.lazy(() => import("./pages/GrammarDetailPage"));
const KanjiPage = React.lazy(() => import("./pages/KanjiPage"));
const KanjiDetailPage = React.lazy(() => import("./pages/KanjiDetailPage"));
const ListeningPage = React.lazy(() => import("./pages/ListeningPage"));
const ListeningDetailPage = React.lazy(() => import("./pages/ListeningDetailPage"));
const ReadingPage = React.lazy(() => import("./pages/ReadingPage"));
const ReadingDetailPage = React.lazy(() => import("./pages/ReadingDetailPage"));
const ExercisePage = React.lazy(() => import("./pages/ExercisePage"));
const ExerciseDetailPage = React.lazy(() => import("./pages/ExerciseDetailPage"));
const ProgressPage = React.lazy(() => import("./pages/ProgressPage"));
const ReviewPage = React.lazy(() => import("./pages/ReviewPage"));
const FavoritePage = React.lazy(() => import("./pages/FavoritePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const BeginnerPage = React.lazy(() => import("./pages/BeginnerPage"));
const N4Page = React.lazy(() => import("./pages/N4Page"));
const HandbookPage = React.lazy(() => import("./pages/HandbookPage"));

// Lazy-loaded Beginner Features
const HiraganaPage = React.lazy(() =>
  import("./features/beginner").then((m) => ({ default: m.HiraganaPage })),
);
const KatakanaPage = React.lazy(() =>
  import("./features/beginner").then((m) => ({ default: m.KatakanaPage })),
);
const PronunciationOverviewPage = React.lazy(() =>
  import("./features/beginner").then((m) => ({ default: m.PronunciationOverviewPage })),
);
const PronunciationTopicPage = React.lazy(() =>
  import("./features/beginner").then((m) => ({ default: m.PronunciationTopicPage })),
);
const NumbersPage = React.lazy(() =>
  import("./features/beginner").then((m) => ({ default: m.NumbersPage })),
);
const PracticePage = React.lazy(() =>
  import("./features/beginner").then((m) => ({ default: m.PracticePage })),
);

// Lazy-loaded Handbook Features
const HandbookCategoryPage = React.lazy(() =>
  import("./features/handbook").then((m) => ({ default: m.HandbookCategoryPage })),
);
const HandbookArticleDetailPage = React.lazy(() =>
  import("./features/handbook").then((m) => ({ default: m.HandbookArticleDetailPage })),
);

// Lazy-loaded Admin CMS
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const AdminDashboardPage = React.lazy(() => import("./pages/admin/AdminDashboardPage"));
const AdminLevelsPage = React.lazy(() => import("./pages/admin/AdminLevelsPage"));
const AdminLessonsPage = React.lazy(() => import("./pages/admin/AdminLessonsPage"));
const AdminVocabulariesPage = React.lazy(() => import("./pages/admin/AdminVocabulariesPage"));
const AdminGrammarsPage = React.lazy(() => import("./pages/admin/AdminGrammarsPage"));
const AdminKanjisPage = React.lazy(() => import("./pages/admin/AdminKanjisPage"));
const AdminListeningsPage = React.lazy(() => import("./pages/admin/AdminListeningsPage"));
const AdminReadingsPage = React.lazy(() => import("./pages/admin/AdminReadingsPage"));
const AdminExercisesPage = React.lazy(() => import("./pages/admin/AdminExercisesPage"));

function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mincho text-2xl font-black shadow-inner animate-pulse">
        学
      </div>
      <div className="w-7 h-7 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-bold text-slate-500 tracking-wider">Đang tải trang...</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <GlobalHorizontalScroll />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {/* Learner Public & Protected Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/beginner" element={<BeginnerPage />} />
          <Route path="/beginner/hiragana" element={<HiraganaPage />} />
          <Route path="/beginner/katakana" element={<KatakanaPage />} />
          <Route path="/beginner/pronunciation" element={<PronunciationOverviewPage />} />
          <Route path="/beginner/pronunciation/:topicSlug" element={<PronunciationTopicPage />} />
          <Route path="/beginner/numbers" element={<NumbersPage />} />
          <Route path="/beginner/practice" element={<PracticePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/leaderboard" element={<Navigate to="/progress?tab=leaderboard" replace />} />
          <Route path="/badges" element={<Navigate to="/progress?tab=badges" replace />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/handbook" element={<HandbookPage />} />
          <Route path="/handbook/:category" element={<HandbookCategoryPage />} />
          <Route path="/handbook/:category/:slug" element={<HandbookArticleDetailPage />} />
          <Route path="/levels/n5" element={<Navigate to="/n5/lessons" replace />} />
          <Route path="/levels/n4" element={<Navigate to="/n4/lessons" replace />} />
          <Route path="/n5" element={<Navigate to="/n5/lessons" replace />} />
          <Route path="/n5/lessons" element={<LessonsPage />} />
          <Route path="/n5/exercises" element={<ExercisePage />} />
          <Route path="/lessons/:lessonId" element={<VocabularyPage />} />
          <Route path="/n5/lessons/:lessonId" element={<VocabularyPage />} />
          <Route path="/n5/lessons/:lessonId/vocabulary" element={<VocabularyPage />} />
          <Route path="/n5/lessons/:lessonId/grammar" element={<GrammarPage />} />
          <Route path="/n5/lessons/:lessonId/kanji" element={<KanjiPage />} />
          <Route path="/n5/lessons/:lessonId/listening" element={<ListeningPage />} />
          <Route path="/n5/lessons/:lessonId/reading" element={<ReadingPage />} />
          <Route path="/n5/lessons/:lessonId/exercise" element={<ExercisePage />} />
          <Route path="/n5/lessons/:lessonId/exercises" element={<ExercisePage />} />

          {/* N4 Routes */}
          <Route path="/n4" element={<Navigate to="/n4/lessons" replace />} />
          <Route path="/n4/lessons" element={<LessonsPage />} />
          <Route path="/n4/exercises" element={<ExercisePage />} />
          <Route path="/n4/lessons/:lessonId" element={<VocabularyPage />} />
          <Route path="/n4/lessons/:lessonId/vocabulary" element={<VocabularyPage />} />
          <Route path="/n4/lessons/:lessonId/grammar" element={<GrammarPage />} />
          <Route path="/n4/lessons/:lessonId/kanji" element={<KanjiPage />} />
          <Route path="/n4/lessons/:lessonId/listening" element={<ListeningPage />} />
          <Route path="/n4/lessons/:lessonId/reading" element={<ReadingPage />} />
          <Route path="/n4/lessons/:lessonId/exercise" element={<ExercisePage />} />
          <Route path="/n4/lessons/:lessonId/exercises" element={<ExercisePage />} />
          <Route path="/vocabulary/:id" element={<VocabularyDetailPage />} />
          <Route path="/grammar/:id" element={<GrammarDetailPage />} />
          <Route path="/kanjis/:id" element={<KanjiDetailPage />} />
          <Route path="/listenings/:id" element={<ListeningDetailPage />} />
          <Route path="/readings/:id" element={<ReadingDetailPage />} />
          <Route path="/exercises/:id" element={<ExerciseDetailPage />} />

          {/* Admin CMS Routes (Protected by RequireAdmin) */}
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="levels" element={<AdminLevelsPage />} />
              <Route path="lessons" element={<AdminLessonsPage />} />
              <Route path="vocabularies" element={<AdminVocabulariesPage />} />
              <Route path="grammars" element={<AdminGrammarsPage />} />
              <Route path="kanjis" element={<AdminKanjisPage />} />
              <Route path="listenings" element={<AdminListeningsPage />} />
              <Route path="readings" element={<AdminReadingsPage />} />
              <Route path="exercises" element={<AdminExercisesPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
