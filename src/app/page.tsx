"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
    ArrowLeft,
    Send,
    Bot,
    User,
    Sparkles,
    MessageCircle,
} from "lucide-react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { chatWithProfileLLM } from "@/app/core/LLM/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/app/lib/utils";

// Button
const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

// Input
const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

// Card
const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "rounded-lg border bg-card text-card-foreground shadow-sm",
                className
            )}
            {...props}
        />
    )
);
Card.displayName = "Card";

// Avatar
const Avatar = forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            className
        )}
        {...props}
    />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarFallback = forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-muted",
            className
        )}
        {...props}
    />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Badge
const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

// Particles
interface ParticlesProps {
    className?: string;
    quantity?: number;
}
function Particles({ className = "", quantity = 50 }: ParticlesProps) {
    const [particles, setParticles] = useState<
        Array<{
            id: number;
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;
            color: string;
        }>
    >([]);

    useEffect(() => {
        const colors = [
            "#dc2626",
            "#ef4444",
            "#f87171",
            "#fca5a5",
            "#ffffff",
        ];
        const newParticles = Array.from({ length: quantity }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setParticles(newParticles);
    }, [quantity]);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) =>
                prev.map((particle) => ({
                    ...particle,
                    x: (particle.x + particle.speedX + 100) % 100,
                    y: (particle.y + particle.speedY + 100) % 100,
                }))
            );
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`pointer-events-none ${className}`}>
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        opacity: particle.opacity,
                        transform: "translate(-50%, -50%)",
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
                    }}
                />
            ))}
        </div>
    );
}

// Main Page
type Message = {
    sender: "user" | "bot";
    message: string;
    imageUrl?: string;
    isMarkdown?: boolean;
    timestamp: Date;
};

const InTouchBotPage = () => {
    const [userInput, setUserInput] = useState("");
    const [conversation, setConversation] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversation, loading]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSend = async () => {
        if (!userInput.trim() || loading) return;
        const newMessage: Message = {
            sender: "user",
            message: userInput.trim(),
            timestamp: new Date(),
        };
        setConversation((prev) => [...prev, newMessage]);
        setUserInput("");
        setLoading(true);
        setIsTyping(true);

        try {
            const botResponse = await chatWithProfileLLM(userInput);
            setIsTyping(false);
            const botMessage: Message = {
                sender: "bot",
                message: botResponse.text,
                imageUrl: botResponse.imageUrl,
                isMarkdown: botResponse.isMarkdown,
                timestamp: new Date(),
            };
            setConversation((prev) => [...prev, botMessage]);
        } catch {
            setIsTyping(false);
            const errorMessage: Message = {
                sender: "bot",
                message:
                    "Desculpe, algo deu errado. Por favor, tente novamente em alguns instantes.",
                timestamp: new Date(),
            };
            setConversation((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const renderMessageContent = (msg: Message) => {
        if (msg.isMarkdown) {
            return (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({ ...props }) => (
                            <p className="prose prose-invert max-w-none" {...props} />
                        ),
                    }}
                >
                    {msg.message}
                </ReactMarkdown>
            );
        }
        return (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.message}
            </p>
        );
    };

    return (
        <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
            {/* Enhanced animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <Particles className="absolute inset-0" quantity={80} />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating header */}
            <header className="relative z-10 backdrop-blur-xl bg-black/40 border-b border-white/10 animate-fade-in">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                                onClick={() => window.history.back()}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                                </div>
                                <span className="text-sm text-white/70">Online</span>
                            </div>
                            <Badge
                                variant="secondary"
                                className="bg-red-500/20 text-red-200 border-red-500/30 animate-pulse"
                            >
                                <Sparkles className="w-3 h-3 mr-1" />
                                Beta
                            </Badge>
                        </div>
                    </div>

                    <div className="text-center mt-8 mb-4">
                        <h1 className="text-4xl md:text-6xl font-bold gradient-text animate-fade-in">
                            InTouch AI Assistant
                        </h1>
                        <p
                            className="text-white/60 mt-3 text-lg animate-fade-in"
                            style={{ animationDelay: "0.2s" }}
                        >
                            Your personal assistant to explore TheusHen&apos;s portfolio
                        </p>
                    </div>
                </div>
            </header>

            {/* Chat Container */}
            <div className="flex-1 relative z-10 flex flex-col max-w-6xl mx-auto w-full px-4 pb-32">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto py-8 space-y-6 scrollbar-thin">
                    {conversation.length === 0 && (
                        <div className="text-center py-16 animate-fade-in">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-full mb-6 animate-pulse">
                                <MessageCircle className="w-10 h-10 text-red-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">
                                Hello! How can I help you?
                            </h3>
                            <p className="text-white/60 max-w-lg mx-auto text-lg">
                                Ask me anything about TheusHen, his projects, experiences, or technical skills.
                            </p>

                            {/* Enhanced suggested questions */}
                            <div className="flex flex-wrap justify-center gap-3 mt-8">
                                {[
                                    "Main Projects",
                                    "About",
                                    "Contact",
                                    "Get Avatar Profile",
                                ].map((suggestion, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline"
                                        size="sm"
                                        className="bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white hover:border-red-400/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                                        style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
                                        onClick={() => setUserInput(suggestion)}
                                    >
                                        {suggestion}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {conversation.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex items-start space-x-4 message-enter ${
                                msg.sender === "user"
                                    ? "flex-row-reverse space-x-reverse"
                                    : ""
                            }`}
                        >
                            <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-white/10 transition-transform duration-300 hover:scale-110">
                                <AvatarFallback
                                    className={
                                        msg.sender === "user"
                                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                                            : "bg-gradient-to-br from-red-500 to-red-600 text-white"
                                    }
                                >
                                    {msg.sender === "user" ? (
                                        <User className="w-5 h-5" />
                                    ) : (
                                        <Bot className="w-5 h-5" />
                                    )}
                                </AvatarFallback>
                            </Avatar>

                            <div
                                className={`flex-1 max-w-xs md:max-w-2xl ${
                                    msg.sender === "user" ? "flex flex-col items-end" : ""
                                }`}
                            >
                                <Card
                                    className={`p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                                        msg.sender === "user"
                                            ? "bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500/50 text-white shadow-blue-500/25"
                                            : "bg-gray-900/80 border-white/20 text-white backdrop-blur-sm shadow-red-500/10"
                                    } shadow-xl`}
                                >
                                    {renderMessageContent(msg)}
                                    {msg.imageUrl && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={msg.imageUrl}
                                            alt="Bot response"
                                            className="mt-4 rounded-lg shadow-lg"
                                        />
                                    )}
                                </Card>
                                <span className="text-xs text-white/40 mt-2 px-2">
                  {formatTime(msg.timestamp)}
                </span>
                            </div>
                        </div>
                    ))}

                    {/* Enhanced Typing Indicator */}
                    {isTyping && (
                        <div className="flex items-start space-x-4 message-enter">
                            <Avatar className="w-10 h-10 ring-2 ring-red-500/50">
                                <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                                    <Bot className="w-5 h-5" />
                                </AvatarFallback>
                            </Avatar>
                            <Card className="p-4 bg-gray-900/80 border-white/20 backdrop-blur-sm">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full typing-dot"></div>
                                    <div className="w-2 h-2 bg-red-400 rounded-full typing-dot"></div>
                                    <div className="w-2 h-2 bg-red-400 rounded-full typing-dot"></div>
                                </div>
                            </Card>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Enhanced Floating Input Area */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6 z-20">
                <div className="bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-4 animate-fade-in">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex items-center space-x-4"
                    >
                        <div className="flex-1 relative">
                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="Type your question..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                disabled={loading}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-red-400 focus:ring-red-400/20 h-12 text-lg rounded-xl transition-all duration-300 focus:scale-[1.02] pr-16"
                                maxLength={500}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <div className="text-xs text-white/40">
                                    {userInput.length}/500
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !userInput.trim()}
                            className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white border-0 h-12 w-12 rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-red-500/25"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </form>

                    <div className="flex items-center justify-between mt-3 text-xs text-white/40">
                        <span>Press Enter to send</span>
                        <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Powered by AI</span>
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InTouchBotPage;