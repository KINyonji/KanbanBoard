import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">메인 페이지</h1>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={() => router.push('/kanban')}
      >
        칸반보드로 이동
      </button>
    </div>
  )
}
