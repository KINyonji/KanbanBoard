'use client'

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useKeyDown } from '@/utils/useKeyDown.util'
import { KeyBoard } from '@/config/keyBoard.config'
import { BUTTON_TEXT } from '@/config/buttonText.config'

type Props = {
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
  const [title, setTitle] = useState<string>(initialTitle)
  const [author, setAuthor] = useState<string>(initialAuthor)
  const [error, setError] = useState<string>('')

  useKeyDown(KeyBoard.ESCAPE, onClose)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value)
  }

  const handleConfirm = () => {
    if (!title.trim() && !author.trim()) {
      setError('제목과 담당자 id는 필수 항목입니다.')
      return
    }
    if (!title.trim()) {
      setError('제목은 필수 항목입니다.')
      return
    }
    if (!author.trim()) {
      setError('담당자 id는 필수 항목입니다.')
      return
    }
    setError('')
    onConfirm(title, author)
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
      }}>
      <div
        style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          width: '400px',
          maxWidth: '100%',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        }}>
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}>
          항목 추가/수정
        </h2>

        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.9rem',
              marginBottom: '0.3rem',
            }}>
            이슈 제목
          </label>
          <input
            type='text'
            value={title}
            onChange={handleTitleChange}
            placeholder='이슈 제목을 입력해주세요'
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
          <label
            style={{
              display: 'block',
              fontSize: '0.9rem',
              marginBottom: '0.3rem',
            }}>
            담당자 id
          </label>
          <input
            type='text'
            value={author}
            onChange={handleAuthorChange}
            placeholder='담당자 id를 입력해주세요'
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
            }}
          />
        </div>

        {error && (
          <div
            style={{
              color: '#dc2626',
              fontSize: '0.875rem',
              marginBottom: '1rem',
            }}>
            {error}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem',
          }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.4rem 1rem',
              backgroundColor: '#e5e5e5',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}>
            {BUTTON_TEXT.CANCEL}
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '0.4rem 1rem',
              backgroundColor: '#d1d5db',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}>
            {BUTTON_TEXT.CONFIRM}
          </button>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(dialog, document.body)
}

export default Dialog
