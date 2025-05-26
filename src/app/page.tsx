import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">메인 페이지</h1>
      <Link href="/kanban" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        칸반보드로 이동
      </Link>
    </div>
  );
}
