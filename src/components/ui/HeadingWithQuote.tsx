interface HeadingWithQuoteProps {
    as?: 'h1' | 'h2';
    title: string;
    quote?: string;
    headingClassName: string;
    className?: string;
}

export default function HeadingWithQuote({ as: Heading = 'h1', title, quote, headingClassName, className = '' }: HeadingWithQuoteProps) {
    return (
        <div className={`flex items-baseline justify-between gap-3 ${className}`}>
            <Heading className={`shrink-0 ${headingClassName}`}>{title}</Heading>
            {quote && (
                <p data-heading-quote className="min-w-0 max-w-[65%] flex-1 text-right font-serif text-xs sm:text-sm italic leading-relaxed break-words text-[#bfbfbf]">
                    {quote}
                </p>
            )}
        </div>
    );
}
