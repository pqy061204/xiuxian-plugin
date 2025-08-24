import React from 'react'
import { useLoginCode } from './Login.code'

export default function Login() {
  const { loading, error, handleSubmit } = useLoginCode()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* 登录卡片 */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-white text-xl sm:text-2xl font-semibold mb-2">
              管理员登录
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              请输入您的管理员账号和密码
            </p>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-6 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0 mt-1"></div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-red-400 font-semibold text-sm sm:text-base">
                    登录失败
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 登录表单 */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                用户名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-lg">👤</span>
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  className="w-full pl-10 pr-4 py-3 sm:py-3 xiuxian-input rounded-xl text-sm sm:text-base"
                  placeholder="请输入管理员用户名"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-lg">🔒</span>
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 sm:py-3 xiuxian-input rounded-xl text-sm sm:text-base"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>登录中...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>🚪</span>
                  <span>登录</span>
                </div>
              )}
            </button>
          </form>

          {/* 分割线 */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800/50 text-slate-400">
                  系统信息
                </span>
              </div>
            </div>
          </div>

          {/* 系统信息 */}
          <div className="text-center space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-slate-400">
              <span>系统版本:</span>
              <span className="text-white">v1.3.0</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-slate-400">
              <span>技术支持:</span>
              <span className="text-white">lemonade-lab</span>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-xs sm:text-sm">
            © 2024 修仙管理系统.
          </p>
        </div>

        {/* 安全提示 */}
        <div className="mt-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0 mt-1"></div>
            <div className="min-w-0 flex-1">
              <h3 className="text-blue-400 font-semibold text-sm sm:text-base">
                安全提醒
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                请确保在安全的环境下登录，不要在公共场所保存密码。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
