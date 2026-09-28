import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import VocabularyPage from "./pages/VocabularyPage";
import VocabularyDetailPage from "./pages/VocabularyDetailPage";
import GrammarPage from "./pages/GrammarPage";
import GrammarDetailPage from "./pages/GrammarDetailPage";
import KanjiPage from "./pages/KanjiPage";
import KanjiDetailPage from "./pages/KanjiDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/n5" element={<Navigate to="/n5/lessons" replace />} />
      <Route path="/n5/lessons" element={<LessonsPage />} />
      <Route path="/n5/lessons/:lessonId" element={<VocabularyPage />} />
      <Route path="/n5/lessons/:lessonId/vocabulary" element={<VocabularyPage />} />
      <Route path="/n5/lessons/:lessonId/grammar" element={<GrammarPage />} />
      <Route path="/n5/lessons/:lessonId/kanji" element={<KanjiPage />} />
      <Route path="/vocabulary/:id" element={<VocabularyDetailPage />} />
      <Route path="/grammar/:id" element={<GrammarDetailPage />} />
      <Route path="/kanjis/:id" element={<KanjiDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
