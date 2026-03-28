"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { MessageSquare, Copy, Check, RefreshCw, Trash2, LogOut, Link2, ToggleLeft, ToggleRight } from "lucide-react";
import { Message } from "@/model/User";

export default function DashboardPage() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptMessages, setAcceptMessages] = useState(true);
    const [isCopied, setIsCopied] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const username = session?.user?.username;
    const profileUrl = typeof window !== "undefined"
        ? `${window.location.origin}/u/${username}`
        : "";

    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/get-messages");
            const data = await res.json();
            if (data.success) {
                setMessages(data.messages || []);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchAcceptStatus = useCallback(async () => {
        try {
            const res = await fetch("/api/accept-messages");
            const data = await res.json();
            if (data.success) {
                setAcceptMessages(data.isAcceptingMessages);
            }
        } catch (error) {
            console.error("Error fetching accept status:", error);
        }
    }, []);

    useEffect(() => {
        if (!session || !session.user) return;
        fetchMessages();
        fetchAcceptStatus();
    }, [session, fetchMessages, fetchAcceptStatus]);

    const handleToggle = async () => {
        setIsToggling(true);
        try {
            const res = await fetch("/api/accept-messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ acceptMessages: !acceptMessages }),
            });
            const data = await res.json();
            if (data.success) {
                setAcceptMessages(!acceptMessages);
            }
        } catch (error) {
            console.error("Error toggling accept messages:", error);
        } finally {
            setIsToggling(false);
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        try {
            const res = await fetch(`/api/delete-message/${messageId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                setMessages(messages.filter((msg) => msg._id !== messageId));
            }
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!session || !session.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-pulse text-slate-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50">
            {/* Top Navigation */}
            <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full border-b border-slate-200 dark:border-slate-800">
                <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                    Silent<span className="text-blue-600 dark:text-blue-500">Ping</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                        Welcome, <span className="font-semibold text-slate-700 dark:text-slate-200">{username}</span>
                    </span>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-10">
                {/* Unique Link Section */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 mb-8 shadow-sm">
                    <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                        <Link2 className="w-5 h-5 text-blue-600" />
                        Your Unique Link
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Share this link to receive anonymous messages
                    </p>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={profileUrl}
                            readOnly
                            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-600 dark:text-slate-300 focus:outline-none"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-all shadow-sm"
                        >
                            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {isCopied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>

                {/* Accept Messages Toggle */}
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 mb-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-1">Accept Messages</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {acceptMessages ? "You are currently accepting messages" : "You are not accepting messages"}
                            </p>
                        </div>
                        <button
                            onClick={handleToggle}
                            disabled={isToggling}
                            className="transition-colors disabled:opacity-50"
                        >
                            {acceptMessages ? (
                                <ToggleRight className="w-12 h-12 text-blue-600" />
                            ) : (
                                <ToggleLeft className="w-12 h-12 text-slate-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Messages Section */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Your Messages</h2>
                    <button
                        onClick={fetchMessages}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>

                {messages.length === 0 ? (
                    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-16 text-center shadow-sm">
                        <MessageSquare className="w-16 h-16 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-400 dark:text-slate-500 mb-2">No messages yet</h3>
                        <p className="text-sm text-slate-400 dark:text-slate-600">Share your unique link to start receiving anonymous messages!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {messages.map((message) => (
                            <div
                                key={String(message._id)}
                                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <p className="text-base leading-relaxed">{message.content}</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                                            {formatDate(message.createdAt)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteMessage(String(message._id))}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                                        title="Delete message"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
