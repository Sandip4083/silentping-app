'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '@/schemas/signUpSchema'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message || 'Error creating account.');
                }
            } else {
                throw new Error('Database disconnected! Please check Vercel Environment variables and redeploy.');
            }
            
            toast.success('Registration successful. You can now login.')
            router.replace('/sign-in')
        } catch (error) {
            console.error('Error during sign-up:', error)
            setError(error instanceof Error ? error.message : 'Error creating account. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="sign-in-wrapper">
            {/* Animated background matching sign in page */}
            <div className="bg-gradient"></div>
            <div className="bg-grid"></div>

            <div className="sign-in-container flex-row-reverse" style={{ flexDirection: 'row-reverse' }}>
                {/* Brand Panel matching sign in page */}
                <div className="brand-panel">
                    <div className="brand-content">
                        <div className="brand-icon">
                            <MessageSquare size={32} />
                        </div>
                        <h1 className="brand-title">Join SilentPing</h1>
                        <p className="brand-subtitle">Create your unique link to start receiving anonymous messages today.</p>
                    </div>
                </div>

                {/* Form Panel */}
                <div className="form-panel">
                    <div className="form-content">
                        <div className="form-header">
                            <h2>Create an Account</h2>
                            <p>Register to start your anonymous journey</p>
                        </div>

                        {error && (
                            <div className="error-banner">
                                <span className="error-dot"></span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <div className={`input-wrapper ${errors.username ? 'input-error' : ''}`}>
                                    <User size={18} className="input-icon" />
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="johndoe"
                                        autoComplete="username"
                                        {...register('username')}
                                    />
                                </div>
                                {errors.username && (
                                    <span className="field-error">{errors.username.message}</span>
                                )}
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <div className={`input-wrapper ${errors.email ? 'input-error' : ''}`}>
                                    <Mail size={18} className="input-icon" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        autoComplete="email"
                                        {...register('email')}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="field-error">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className={`input-wrapper ${errors.password ? 'input-error' : ''}`}>
                                    <Lock size={18} className="input-icon" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a strong password"
                                        autoComplete="new-password"
                                        {...register('password')}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="field-error">{errors.password.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <>
                                        Sign Up
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="form-footer">
                            <p>
                                Already have an account?{' '}
                                <a href="/sign-in" className="signup-link">
                                    Sign in instead
                                    <ArrowRight size={14} />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Same styles as sign-in for consistency */}
            <style jsx>{`
                .sign-in-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 20px; background: #06060a; }
                .bg-gradient { position: fixed; inset: 0; background: radial-gradient(ellipse 80% 60% at 20% 40%, rgba(99, 102, 241, 0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(168, 85, 247, 0.1), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(59, 130, 246, 0.08), transparent 50%); pointer-events: none; }
                .bg-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
                .sign-in-container { display: flex; width: 100%; max-width: 960px; min-height: 600px; border-radius: 24px; overflow: hidden; background: rgba(15, 15, 25, 0.6); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.06); box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.03), 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 120px rgba(99, 102, 241, 0.05); position: relative; z-index: 1; animation: containerIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
                @keyframes containerIn { to { opacity: 1; transform: translateY(0); } }
                .brand-panel { flex: 1; padding: 48px; display: flex; flex-direction: column; justify-content: space-between; position: relative; background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(59, 130, 246, 0.08) 100%); border-right: 1px solid rgba(255, 255, 255, 0.05); overflow: hidden; }
                .brand-content { position: relative; z-index: 1; }
                .brand-icon { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3); }
                .brand-title { font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; margin: 0 0 8px 0; background: linear-gradient(135deg, #fff, rgba(255,255,255,0.7)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .brand-subtitle { font-size: 15px; color: rgba(255, 255, 255, 0.45); margin: 0 0 48px 0; line-height: 1.5; }
                .form-panel { flex: 1; padding: 48px; display: flex; align-items: center; justify-content: center; }
                .form-content { width: 100%; max-width: 380px; }
                .form-header { margin-bottom: 32px; }
                .form-header h2 { font-size: 26px; font-weight: 700; color: #ffffff; margin: 0 0 8px 0; letter-spacing: -0.3px; }
                .form-header p { font-size: 14px; color: rgba(255, 255, 255, 0.4); margin: 0; }
                .error-banner { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; color: #fca5a5; font-size: 13px; margin-bottom: 24px; }
                .error-dot { width: 6px; height: 6px; border-radius: 50%; background: #ef4444; flex-shrink: 0; animation: pulse 2s ease-in-out infinite; }
                .sign-in-form { display: flex; flex-direction: column; gap: 16px; }
                .input-group { display: flex; flex-direction: column; gap: 6px; }
                .input-group label { font-size: 13px; font-weight: 500; color: rgba(255, 255, 255, 0.55); }
                .input-wrapper { display: flex; align-items: center; gap: 10px; padding: 0 16px; height: 48px; border-radius: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); transition: all 0.25s ease; }
                .input-wrapper:focus-within { border-color: rgba(99, 102, 241, 0.5); background: rgba(99, 102, 241, 0.04); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08); }
                .input-wrapper.input-error { border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.04); }
                .input-icon { color: rgba(255, 255, 255, 0.25); flex-shrink: 0; }
                .input-wrapper:focus-within .input-icon { color: rgba(99, 102, 241, 0.7); }
                .input-wrapper input { flex: 1; background: none; border: none; outline: none; font-size: 14px; color: #ffffff; height: 100%; }
                .toggle-password { background: none; border: none; color: rgba(255, 255, 255, 0.25); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; }
                .field-error { font-size: 12px; color: #f87171; padding-left: 2px; }
                .submit-btn { height: 48px; border-radius: 12px; border: none; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.3s ease; margin-top: 8px; }
                .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(99, 102, 241, 0.35); }
                .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .spinner { width: 20px; height: 20px; border: 2px solid rgba(255, 255, 255, 0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
                .form-footer { margin-top: 28px; text-align: center; }
                .form-footer p { font-size: 14px; color: rgba(255, 255, 255, 0.35); margin: 0; }
                .signup-link { color: #a5b4fc; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 4px; }
                @media (max-width: 768px) { .sign-in-container { flex-direction: column; max-width: 480px; } .brand-panel { padding: 32px; border-right: none; } .form-panel { padding: 32px; } }
            `}</style>
        </div>
    )
}
