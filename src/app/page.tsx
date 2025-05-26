"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Send } from "lucide-react";
import Image from "next/image";
import Particles from "./componets/particles";
import { chatWithProfileLLM } from "./core/LLM/chat";
import ReactMarkdown from "react-markdown";
import { SpeedInsights } from "@vercel/speed-insights/next"

type Message = {
    sender: "user" | "bot";
    message: string;
    imageUrl?: string;
    isMarkdown?: boolean;
};

const InTouchBotPage = () => {
    const [userInput, setUserInput] = useState("");
    const [conversation, setConversation] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const chatAreaRef = useRef<HTMLDivElement | null>(null);
    const [isInputBarVisible, setIsInputBarVisible] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const searchParams = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : undefined;
    const helpPrompt = searchParams?.get("help");

    // Auto-scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation, loading]);

    // Scroll to bottom of chat container when a new message is added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    // Handle prompt from /?help=
    useEffect(() => {
        if (helpPrompt && conversation.length === 0) {
            (async () => {
                setConversation((conv) => [
                    ...conv,
                    { sender: "user", message: helpPrompt },
                ]);
                setLoading(true);
                try {
                    const botResponse = await chatWithProfileLLM(helpPrompt);
                    setConversation((conv) => [
                        ...conv,
                        {
                            sender: "bot",
                            message: botResponse.text,
                            imageUrl: botResponse.imageUrl,
                            isMarkdown: botResponse.isMarkdown,
                        },
                    ]);
                } catch {
                    setConversation((conv) => [
                        ...conv,
                        { sender: "bot", message: "Sorry, something went wrong." },
                    ]);
                }
                setLoading(false);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [helpPrompt]);

    const handleSend = async () => {
        if (!userInput.trim()) return;
        setConversation((conv) => [
            ...conv,
            { sender: "user", message: userInput },
        ]);
        setLoading(true);
        try {
            const botResponse = await chatWithProfileLLM(userInput);
            setConversation((conv) => [
                ...conv,
                {
                    sender: "bot",
                    message: botResponse.text,
                    imageUrl: botResponse.imageUrl,
                    isMarkdown: botResponse.isMarkdown,
                },
            ]);
        } catch {
            setConversation((conv) => [
                ...conv,
                { sender: "bot", message: "Sorry, something went wrong." },
            ]);
        }
        setUserInput("");
        setLoading(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsInputBarVisible(false);
            } else {
                setIsInputBarVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative flex flex-col w-full h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black overflow-hidden">
            <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />
            <SpeedInsights />

            {/* Header */}
            <div className="flex flex-col items-center w-full pt-8 pb-2">
                <div className="py-2 px-0.5 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-7xl whitespace-nowrap bg-clip-text">
                    InTouchBot - Beta
                </div>
                <a href="https://theushen.me" className="mt-4 flex items-center text-lg text-gray-500 hover:text-white transition">
                    <FaArrowLeft className="mr-2" /> Go Back
                </a>
            </div>

            {/* Chat Area */}
            <div className="flex-1 w-full flex flex-col items-center justify-end px-2 sm:px-0">
                <div className="w-full max-w-3xl flex flex-col flex-1 overflow-hidden">
                    <div
                        className="flex-1 overflow-y-auto px-2 pb-3 scrollable-chat-area"
                        style={{ scrollbarWidth: "thin" }}
                        ref={chatAreaRef}
                    >
                        <div className="flex flex-col gap-2 pt-2" ref={chatContainerRef}>
                            {conversation.length === 0 && !loading && (
                                <div className="text-center text-gray-400 mt-16 mb-4 select-none">
                                    Ask me anything about TheusHen!
                                </div>
                            )}
                            {conversation.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${
                                        msg.sender === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`relative max-w-[75%] md:max-w-[60%] break-words px-4 py-2 rounded-2xl shadow-sm ${
                                            msg.sender === "user"
                                                ? "bg-blue-600 text-white rounded-br-lg"
                                                : "bg-zinc-700 text-green-200 rounded-bl-lg"
                                        }`}
                                    >
                                        {msg.isMarkdown ? (
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ ...props }) => (
                                                        // eslint-disable-next-line
                                                        <a {...props} target="_blank" rel="noopener noreferrer" className="underline text-blue-300" />
                                                    ),
                                                    p: ({ ...props }) => <p {...props} className="mb-2" />,
                                                    li: ({ ...props }) => <li {...props} className="ml-6 list-disc" />,
                                                    strong: ({ ...props }) => <strong {...props} className="font-semibold" />,
                                                }}
                                            >
                                                {msg.message}
                                            </ReactMarkdown>
                                        ) : (
                                            <div>{msg.message}</div>
                                        )}
                                        {msg.imageUrl && (
                                            <div className="mt-2 rounded-md overflow-hidden">
                                                <Image
                                                    src={msg.imageUrl}
                                                    alt="Image"
                                                    width={300}
                                                    height={200}
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-2xl max-w-[60%]">
                                        Thinking...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Area, sticky at bottom */}
            <form
                className={`w-full max-w-3xl mx-auto px-2 sm:px-0 pb-6 floating-input-bar ${isInputBarVisible ? "" : "hidden"}`}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!loading) handleSend();
                }}
            >
                <div className="flex gap-2 items-center w-full">
                    <input
                        type="text"
                        className="flex-1 rounded-full px-4 py-3 bg-zinc-700 text-white focus:outline-none border-none shadow-inner text-base sm:text-lg placeholder-zinc-400 transition"
                        placeholder="Type your question..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !loading) handleSend();
                        }}
                        disabled={loading}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={loading || !userInput.trim()}
                        className={`rounded-full p-3 flex items-center justify-center transition ${
                            loading || !userInput.trim()
                                ? "bg-gray-800 opacity-60"
                                : "bg-gray-600 hover:bg-gray-700"
                        }`}
                        aria-label="Send"
                    >
                        <Send size={24} className="text-white" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InTouchBotPage;
