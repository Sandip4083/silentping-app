"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { MessageSquare, Send, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function SendMessagePage() {
    const params = useParams<{ username: string }>();
    const username = params.username;
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSending(true);
        setStatus("idle");

        try {
            const res = await fetch("/api/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, content }),
            });
            const data = await res.json();

            if (data.success) {
                setStatus("success");
                setContent("");
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Failed to send message");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 flex flex-col">
            {/* Navigation */}
            <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
                <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                    Silent<span className="text-blue-600 dark:text-blue-500">Ping</span>
                </Link>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center rounded-full border border-blue-200/50 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-800/50 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                            Anonymous Message
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                            Send a message to{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                @{username}
                            </span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Your identity will remain completely anonymous
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                            <textarea
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                    setStatus("idle");
                                }}
                                placeholder="Write your anonymous message here..."
                                rows={5}
                                maxLength={500}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            />
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-slate-400">
                                    {content.length}/500 characters
                                </span>
                                <button
                                    type="submit"
                                    disabled={isSending || !content.trim()}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-medium text-sm transition-all shadow-sm disabled:shadow-none"
                                >
                                    <Send className="w-4 h-4" />
                                    {isSending ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Status Messages */}
                    {status === "success" && (
                        <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            Message sent successfully! Your identity remains anonymous.
                        </div>
                    )}

                    {status === "error" && (
                        <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            {errorMessage}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
