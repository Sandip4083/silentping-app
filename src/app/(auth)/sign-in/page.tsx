'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/schemas/signInSchema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff, ArrowRight, MessageSquare, Shield, Zap } from 'lucide-react'

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    })

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn('credentials', {
                redirect: false,
                identifier: data.identifier,
                password: data.password,
            })

            if (result?.error) {
                setError(result.error === 'CredentialsSignin'
                    ? 'Invalid email or password'
                    : result.error)
            } else if (result?.url) {
                router.replace('/dashboard')
            }
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="sign-in-wrapper">
            {/* Animated background */}
            <div className="bg-gradient"></div>
            <div className="bg-grid"></div>
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
            <div className="floating-orb orb-3"></div>

            <div className="sign-in-container">
                {/* Left panel - Branding */}
                <div className="brand-panel">
                    <div className="brand-content">
                        <div className="brand-icon">
                            <MessageSquare size={32} />
                        </div>
                        <h1 className="brand-title">SilentPing</h1>
                        <p className="brand-subtitle">Anonymous messaging, redefined.</p>

                        <div className="features-list">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <Shield size={18} />
                                </div>
                                <div>
                                    <h3>100% Anonymous</h3>
                                    <p>Your identity stays hidden</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <h3>Instant Delivery</h3>
                                    <p>Messages arrive in real-time</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <Lock size={18} />
                                </div>
                                <div>
                                    <h3>End-to-End Secure</h3>
                                    <p>Protected by encryption</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="brand-decoration">
                        <div className="deco-ring ring-1"></div>
                        <div className="deco-ring ring-2"></div>
                        <div className="deco-ring ring-3"></div>
                    </div>
                </div>

                {/* Right panel - Form */}
                <div className="form-panel">
                    <div className="form-content">
                        <div className="form-header">
                            <h2>Welcome back</h2>
                            <p>Sign in to your account to continue</p>
                        </div>

                        {error && (
                            <div className="error-banner">
                                <span className="error-dot"></span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
                            <div className="input-group">
                                <label htmlFor="identifier">Email</label>
                                <div className={`input-wrapper ${errors.identifier ? 'input-error' : ''}`}>
                                    <Mail size={18} className="input-icon" />
                                    <input
                                        id="identifier"
                                        type="email"
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        {...register('identifier')}
                                    />
                                </div>
                                {errors.identifier && (
                                    <span className="field-error">{errors.identifier.message}</span>
                                )}
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className={`input-wrapper ${errors.password ? 'input-error' : ''}`}>
                                    <Lock size={18} className="input-icon" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        {...register('password')}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
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
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="form-footer">
                            <p>
                                Don&apos;t have an account?{' '}
                                <a href="/sign-up" className="signup-link">
                                    Create one
                                    <ArrowRight size={14} />
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .sign-in-wrapper {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    padding: 20px;
                    background: #06060a;
                }

                .bg-gradient {
                    position: fixed;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 80% 60% at 20% 40%, rgba(99, 102, 241, 0.12), transparent 60%),
                        radial-gradient(ellipse 60% 50% at 80% 60%, rgba(168, 85, 247, 0.1), transparent 50%),
                        radial-gradient(ellipse 50% 40% at 50% 100%, rgba(59, 130, 246, 0.08), transparent 50%);
                    pointer-events: none;
                }

                .bg-grid {
                    position: fixed;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                }

                .floating-orb {
                    position: fixed;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.4;
                    animation: float 20s ease-in-out infinite;
                    pointer-events: none;
                }

                .orb-1 {
                    width: 400px;
                    height: 400px;
                    background: rgba(99, 102, 241, 0.15);
                    top: -100px;
                    left: -100px;
                    animation-delay: 0s;
                }

                .orb-2 {
                    width: 300px;
                    height: 300px;
                    background: rgba(168, 85, 247, 0.12);
                    bottom: -50px;
                    right: -50px;
                    animation-delay: -7s;
                }

                .orb-3 {
                    width: 200px;
                    height: 200px;
                    background: rgba(59, 130, 246, 0.1);
                    top: 50%;
                    left: 50%;
                    animation-delay: -14s;
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -40px) scale(1.05); }
                    66% { transform: translate(-20px, 20px) scale(0.95); }
                }

                .sign-in-container {
                    display: flex;
                    width: 100%;
                    max-width: 960px;
                    min-height: 600px;
                    border-radius: 24px;
                    overflow: hidden;
                    background: rgba(15, 15, 25, 0.6);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    box-shadow:
                        0 0 0 1px rgba(255, 255, 255, 0.03),
                        0 20px 60px rgba(0, 0, 0, 0.5),
                        0 0 120px rgba(99, 102, 241, 0.05);
                    position: relative;
                    z-index: 1;
                    animation: containerIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }

                @keyframes containerIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Brand Panel */
                .brand-panel {
                    flex: 1;
                    padding: 48px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    background: linear-gradient(135deg,
                        rgba(99, 102, 241, 0.08) 0%,
                        rgba(168, 85, 247, 0.05) 50%,
                        rgba(59, 130, 246, 0.08) 100%);
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                }

                .brand-content {
                    position: relative;
                    z-index: 1;
                }

                .brand-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #6366f1, #a855f7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    margin-bottom: 24px;
                    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
                }

                .brand-title {
                    font-size: 32px;
                    font-weight: 700;
                    color: #ffffff;
                    letter-spacing: -0.5px;
                    margin: 0 0 8px 0;
                    background: linear-gradient(135deg, #fff, rgba(255,255,255,0.7));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .brand-subtitle {
                    font-size: 15px;
                    color: rgba(255, 255, 255, 0.45);
                    margin: 0 0 48px 0;
                    line-height: 1.5;
                }

                .features-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .feature-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    animation: featureIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                    transform: translateX(-10px);
                }

                .feature-item:nth-child(1) { animation-delay: 0.3s; }
                .feature-item:nth-child(2) { animation-delay: 0.45s; }
                .feature-item:nth-child(3) { animation-delay: 0.6s; }

                @keyframes featureIn {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .feature-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(163, 163, 255, 0.8);
                    flex-shrink: 0;
                }

                .feature-item h3 {
                    font-size: 14px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.85);
                    margin: 0 0 2px 0;
                }

                .feature-item p {
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.35);
                    margin: 0;
                }

                .brand-decoration {
                    position: absolute;
                    bottom: -60px;
                    right: -60px;
                    width: 250px;
                    height: 250px;
                }

                .deco-ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid rgba(99, 102, 241, 0.1);
                    animation: ringPulse 4s ease-in-out infinite;
                }

                .ring-1 {
                    width: 200px;
                    height: 200px;
                    top: 25px;
                    left: 25px;
                    animation-delay: 0s;
                }

                .ring-2 {
                    width: 160px;
                    height: 160px;
                    top: 45px;
                    left: 45px;
                    animation-delay: 0.5s;
                }

                .ring-3 {
                    width: 120px;
                    height: 120px;
                    top: 65px;
                    left: 65px;
                    animation-delay: 1s;
                }

                @keyframes ringPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }

                /* Form Panel */
                .form-panel {
                    flex: 1;
                    padding: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .form-content {
                    width: 100%;
                    max-width: 380px;
                }

                .form-header {
                    margin-bottom: 32px;
                }

                .form-header h2 {
                    font-size: 26px;
                    font-weight: 700;
                    color: #ffffff;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.3px;
                }

                .form-header p {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.4);
                    margin: 0;
                }

                .error-banner {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 16px;
                    background: rgba(239, 68, 68, 0.08);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    border-radius: 12px;
                    color: #fca5a5;
                    font-size: 13px;
                    margin-bottom: 24px;
                    animation: shakeIn 0.4s ease;
                }

                .error-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #ef4444;
                    flex-shrink: 0;
                    animation: pulse 2s ease-in-out infinite;
                }

                @keyframes shakeIn {
                    0% { transform: translateX(-10px); opacity: 0; }
                    50% { transform: translateX(5px); }
                    100% { transform: translateX(0); opacity: 1; }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }

                .sign-in-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .input-group label {
                    font-size: 13px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.55);
                    letter-spacing: 0.3px;
                }

                .input-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 0 16px;
                    height: 48px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.25s ease;
                }

                .input-wrapper:focus-within {
                    border-color: rgba(99, 102, 241, 0.5);
                    background: rgba(99, 102, 241, 0.04);
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
                }

                .input-wrapper.input-error {
                    border-color: rgba(239, 68, 68, 0.4);
                    background: rgba(239, 68, 68, 0.04);
                }

                .input-icon {
                    color: rgba(255, 255, 255, 0.25);
                    flex-shrink: 0;
                }

                .input-wrapper:focus-within .input-icon {
                    color: rgba(99, 102, 241, 0.7);
                }

                .input-wrapper input {
                    flex: 1;
                    background: none;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    color: #ffffff;
                    height: 100%;
                    font-family: inherit;
                }

                .input-wrapper input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }

                .toggle-password {
                    background: none;
                    border: none;
                    color: rgba(255, 255, 255, 0.25);
                    cursor: pointer;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: color 0.2s;
                    border-radius: 6px;
                }

                .toggle-password:hover {
                    color: rgba(255, 255, 255, 0.5);
                }

                .field-error {
                    font-size: 12px;
                    color: #f87171;
                    padding-left: 2px;
                }

                .submit-btn {
                    height: 48px;
                    border-radius: 12px;
                    border: none;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    margin-top: 8px;
                    font-family: inherit;
                }

                .submit-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #818cf8, #a78bfa);
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .submit-btn:hover:not(:disabled)::before {
                    opacity: 1;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.35);
                }

                .submit-btn:active:not(:disabled) {
                    transform: translateY(0);
                }

                .submit-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .submit-btn > * {
                    position: relative;
                    z-index: 1;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .form-footer {
                    margin-top: 28px;
                    text-align: center;
                }

                .form-footer p {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.35);
                    margin: 0;
                }

                .signup-link {
                    color: #a5b4fc;
                    text-decoration: none;
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    transition: all 0.2s;
                }

                .signup-link:hover {
                    color: #c7d2fe;
                    gap: 8px;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .sign-in-container {
                        flex-direction: column;
                        max-width: 480px;
                        min-height: auto;
                    }

                    .brand-panel {
                        padding: 32px 32px 28px;
                        border-right: none;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }

                    .features-list {
                        display: none;
                    }

                    .brand-subtitle {
                        margin-bottom: 0;
                    }

                    .brand-decoration {
                        display: none;
                    }

                    .form-panel {
                        padding: 32px;
                    }
                }
            `}</style>
        </div>
    )
}