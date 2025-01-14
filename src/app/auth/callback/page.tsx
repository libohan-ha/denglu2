'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const { hash } = window.location
    if (hash) {
      // 从URL中提取access_token
      const accessToken = new URLSearchParams(hash.substring(1)).get('access_token')
      if (accessToken) {
        // 设置session
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: '',
        })
        // 跳转到成功页面
        router.push('/auth/success')
      }
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">正在处理登录...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  )
} 