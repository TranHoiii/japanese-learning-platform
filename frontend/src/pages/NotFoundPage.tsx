import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900">404</h1>
        <p className="mt-3 text-slate-600">Không tìm thấy trang.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white"
        >
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
