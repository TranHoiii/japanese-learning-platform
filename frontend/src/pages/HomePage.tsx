import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            Project scaffold
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Japanese Learning Platform
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Nền tảng học tiếng Nhật cho người Việt. Frontend React + TypeScript
            và backend Spring Boot đã được chuẩn bị để bắt đầu phát triển.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Bắt đầu xây dựng
            </Link>

            <a
              href="/api/v1/health"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Kiểm tra API
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Backend", "Spring Boot 3.5"],
              ["Database", "MySQL 8 + Flyway"],
              ["Frontend", "React + TypeScript"],
              ["Infrastructure", "Docker + Nginx"],
            ].map(([title, value]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <p className="text-sm text-slate-500">{title}</p>
                <p className="mt-1 font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
