'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useMessages } from '@/lib/i18n/useMessages';
import { Children, isValidElement, type ReactNode } from 'react';
import Link from 'next/link';

function getCardHref(children: ReactNode): string | undefined {
    for (const child of Children.toArray(children)) {
        if (!isValidElement<{ href?: string; children?: ReactNode }>(child)) continue;
        if (child.props.href) return child.props.href;
        const nestedHref = getCardHref(child.props.children);
        if (nestedHref) return nestedHref;
    }
}

interface AboutProps {
    content: string;
    title?: string;
    cardLinks?: boolean;
}

export default function About({ content, title, cardLinks = false }: AboutProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.about;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <h2 className="text-3xl font-serif font-bold text-primary mb-5">{resolvedTitle}</h2>
            <div className="text-base sm:text-lg text-neutral-700 dark:text-neutral-600 leading-8">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => <h1 className="text-3xl font-serif font-bold text-primary mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-serif font-bold text-primary mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="mb-5 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className={cardLinks ? "grid gap-4 list-none" : "list-disc list-inside mb-4 space-y-1 ml-4"}>{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                        li: ({ children }) => {
                            if (!cardLinks) return <li className="mb-1">{children}</li>;
                            const href = getCardHref(children);
                            const className = "card-bg block rounded-lg border px-5 py-4 shadow-sm hover:border-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
                            return (
                                <li>
                                    {href ? <Link href={href} className={className}>{children}</Link> : <div className={className}>{children}</div>}
                                </li>
                            );
                        },
                        a: ({ href, children, ...props }) => cardLinks ? <span className="text-link font-medium">{children}</span> : (
                            <a
                                {...props}
                                href={href}
                                target={href?.startsWith('/') ? undefined : '_blank'}
                                rel={href?.startsWith('/') ? undefined : 'noopener noreferrer'}
                                className="text-link font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                            >{children}</a>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
                                {children}
                            </blockquote>
                        ),
                        strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                        em: ({ children }) => <em className="italic text-neutral-600 dark:text-neutral-500">{children}</em>,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
}
