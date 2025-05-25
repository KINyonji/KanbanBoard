import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  mode?: string
  initialTitle?: string
  initialAuthor?: string
  onConfirm: (title: string, author: string) => void
  onClose: () => void
}

const Dialog: React.FC<Props> = ({
  initialTitle = '',
  initialAuthor = '',
  onConfirm,
  onClose,
}) => {
  const [title, setTitle] = React.useState(initialTitle)
  const [author, setAuthor] = React.useState(initialAuthor)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const dialog = (
    <div
      style={{
        position: 'fixed',
        inset: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleClickOutside}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          width: '400px',
          maxWidth: '100%',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        }}
      >
        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>항목 추가/수정</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>이슈 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="이슈 제목을 입력해주세요"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem' }}>담당자 id</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="담당자 id를 입력해주세요"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.4rem 1rem',
              backgroundColor: '#e5e5e5',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(title, author)}
            style={{
              padding: '0.4rem 1rem',
              backgroundColor: '#d1d5db',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(dialog, document.body)
}

export default Dialog
