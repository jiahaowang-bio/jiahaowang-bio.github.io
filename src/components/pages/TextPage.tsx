'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { TextPageConfig } from '@/types/page';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface TextPageProps {
    config: TextPageConfig;
    content: string;
    embedded?: boolean;
}

export default function TextPage({ config, content, embedded = false }: TextPageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={embedded ? "" : "max-w-3xl mx-auto"}
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary`}>{config.title}</h1>
                {config.pdf && (
                    <a
                        href={config.pdf}
                        download
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-background text-xs font-medium hover:bg-primary-dark dark:hover:bg-primary-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                        <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
                        {config.download_label || 'Download PDF'}
                    </a>
                )}
            </div>
            {config.description && (
                <p className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 mb-8 max-w-2xl`}>
                    {config.description}
                </p>
            )}
            <div className="text-neutral-700 dark:text-neutral-600 leading-relaxed">
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => <h1 className="text-3xl font-serif font-bold text-primary mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-serif font-bold text-primary mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-semibold text-primary mt-6 mb-3">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        a: ({ ...props }) => (
                            <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-link font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                            />
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
            {config.pdf_preview && (
                <a href={config.pdf_preview.src} target="_blank" rel="noopener noreferrer" className="block mt-6 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                    <Image
                        src={config.pdf_preview.src}
                        width={config.pdf_preview.width}
                        height={config.pdf_preview.height}
                        alt={config.pdf_preview.alt || config.title}
                        className="block w-full h-auto rounded-lg border border-border"
                        sizes="(max-width: 768px) 100vw, 768px"
                    />
                </a>
            )}
        </motion.div>
    );
}
