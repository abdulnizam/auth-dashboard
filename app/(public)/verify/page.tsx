'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VerifyPage() {
  const params = useSearchParams()
  const [status, setStatus] = useState('Verifying...')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const token = params.get('token')
    const email = params.get('email')

    if (!token || !email) {
      setStatus('❌ Invalid verification link.')
      return
    }

    fetch('http://localhost:8080/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
    })
      .then(async res => {
        const data = await res.json()
        if (res.ok) {
          setStatus('✅ Your email has been verified!')
          setShowSuccess(true)
        } else {
          setStatus(`❌ Verification failed: ${data.message || 'Unknown error'}`)
        }
      })
      .catch(() => setStatus('❌ Network error verifying account.'))
  }, [params])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-2xl font-semibold mb-4">{status}</h1>
      {showSuccess && (
        <p className="text-sm text-gray-600">
          You can now go to the app and <a href="/login" className="text-blue-500 underline">log in</a>.
        </p>
      )}
    </div>
  )
}