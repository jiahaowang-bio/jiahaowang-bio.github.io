'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { AcademicTrendConfig } from '@/types/page';

export default function AcademicTrend({ config }: { config: AcademicTrendConfig }) {
    const container = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(600);
    const [selected, setSelected] = useState(config.points.length - 1);
    const [replay, setReplay] = useState(0);
    const reduceMotion = useReducedMotion();
    const inView = useInView(container, { once: true, amount: 0.4 });
    const titleId = useId();
    const descriptionId = useId();
    const clipId = useId();

    useEffect(() => {
        const element = container.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const height = 286;
    const left = width < 360 ? 42 : 52;
    const right = width - 24;
    const top = 52;
    const bottom = height - 50;
    const values = config.points.flatMap(point => [point.gpa, point.cumulative_gpa]);
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const padding = Math.max((maximum - minimum) * 0.3, 0.08);
    const low = Math.max(0, Math.floor((minimum - padding) * 10) / 10);
    const high = Math.min(config.max_gpa, Math.ceil((maximum + padding) * 10) / 10);
    const x = (index: number) => left + index / Math.max(config.points.length - 1, 1) * (right - left);
    const y = (value: number) => bottom - (value - low) / Math.max(high - low, 0.1) * (bottom - top);
    const ticks = Array.from({ length: Math.round((high - low) * 10) + 1 }, (_, index) => low + index / 10)
        .filter((_, index, all) => index % 2 === 0 || index === all.length - 1);
    const path = config.points.map((point, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(point.gpa)}`).join(' ');
    const cumulativePath = config.points.map((point, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(point.cumulative_gpa)}`).join(' ');
    const active = config.points[Math.min(selected, config.points.length - 1)];

    return (
        <section aria-label={config.title} className="mt-6 border-t border-border pt-6">
            <h4 className="text-lg font-semibold text-primary">{config.title}</h4>
            <p className="mt-1 text-sm text-neutral-500">{config.subtitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-600 dark:text-neutral-500" aria-label={config.subtitle}>
                <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block w-6 border-t-2 border-accent" />{config.semester_label}</span>
                <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="inline-block w-6 border-t-2 border-dashed border-primary" />{config.cumulative_label}</span>
            </div>
            <div className="mt-4 mb-2 flex flex-wrap items-center justify-between gap-3">
                <p data-gpa-selection className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-500">
                    <span>{active.label}</span>
                    <span>{config.semester_label}<strong className="ml-2 text-base tabular-nums font-semibold text-primary">{active.gpa.toFixed(2)}</strong></span>
                    <span>{config.cumulative_label}<strong className="ml-2 text-base tabular-nums font-semibold text-primary">{active.cumulative_gpa.toFixed(2)}</strong></span>
                </p>
                <button type="button" onClick={() => setReplay(value => value + 1)}
                    className="rounded-md border border-border px-3 py-2 text-xs text-primary transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                    {config.replay_label}
                </button>
            </div>
            <div ref={container} className="relative w-full" style={{ height }}>
                <svg data-gpa-chart data-gpa-plot-width={right - left + 14} role="img" aria-labelledby={`${titleId} ${descriptionId}`}
                    viewBox={`0 0 ${width} ${height}`} className="block h-full w-full">
                    <title id={titleId}>{config.title}</title>
                    <desc id={descriptionId}>{config.subtitle}. {config.points.map(point => `${point.label}: ${config.semester_label} ${point.gpa.toFixed(2)}, ${config.cumulative_label} ${point.cumulative_gpa.toFixed(2)}`).join('; ')}.</desc>
                    <defs>
                        <clipPath id={clipId}>
                            <motion.rect key={replay} data-gpa-reveal x={left - 7} y={top - 10} height={bottom - top + 20}
                                initial={reduceMotion ? false : { width: 0 }}
                                animate={{ width: inView || reduceMotion ? right - left + 14 : 0 }}
                                transition={{ duration: reduceMotion ? 0 : 1.1, ease: 'easeInOut' }} />
                        </clipPath>
                    </defs>
                    {ticks.map(tick => (
                        <g key={tick}>
                            <line x1={left} y1={y(tick)} x2={right} y2={y(tick)} stroke="var(--border)" />
                            <text x={left - 10} y={y(tick) + 4} textAnchor="end" fill="var(--neutral-500)" fontSize="12">{tick.toFixed(1)}</text>
                        </g>
                    ))}
                    <text x={left} y={16} fill="var(--neutral-500)" fontSize="12">{config.y_label}</text>
                    <text x={(left + right) / 2} y={height - 2} textAnchor="middle" fill="var(--neutral-500)" fontSize="12">{config.x_label}</text>
                    <g clipPath={`url(#${clipId})`}>
                        <path data-gpa-line d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path data-cumulative-line d={cumulativePath} fill="none" stroke="var(--primary)" strokeWidth="2"
                            strokeDasharray="5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    {config.points.map((point, index) => (
                        <g key={point.label}>
                            <circle cx={x(index)} cy={y(point.gpa)} r={index === selected ? 5 : 4}
                                fill={index === selected ? 'var(--accent)' : 'var(--surface)'} stroke="var(--accent)" strokeWidth="2" />
                            <text x={x(index)} y={y(point.gpa) + (point.cumulative_gpa > point.gpa && Math.abs(y(point.gpa) - y(point.cumulative_gpa)) < 36 ? 22 : -15)} textAnchor={index === 0 ? 'start' : index === config.points.length - 1 ? 'end' : 'middle'}
                                fill="var(--primary)" fontSize="12" fontWeight="600">{point.gpa.toFixed(2)}</text>
                            <rect x={x(index) - 3} y={y(point.cumulative_gpa) - 3} width="6" height="6"
                                fill={index === selected ? 'var(--primary)' : 'var(--surface)'} stroke="var(--primary)" strokeWidth="1.5" />
                            <text x={x(index)} y={bottom + 25} textAnchor={index === 0 ? 'start' : index === config.points.length - 1 ? 'end' : 'middle'}
                                fill="var(--neutral-500)" fontSize="12">{point.label}</text>
                        </g>
                    ))}
                </svg>
                {config.points.map((point, index) => (
                    <button key={point.label} type="button" data-gpa-point aria-pressed={index === selected}
                        aria-label={`${point.label}, ${config.semester_label} ${point.gpa.toFixed(2)}, ${config.cumulative_label} ${point.cumulative_gpa.toFixed(2)}`}
                        onClick={() => setSelected(index)} onFocus={() => setSelected(index)} onPointerEnter={() => setSelected(index)}
                        className="absolute w-11 -translate-x-1/2 -translate-y-1/2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        style={{ left: x(index), top: (y(point.gpa) + y(point.cumulative_gpa)) / 2, height: Math.abs(y(point.gpa) - y(point.cumulative_gpa)) + 44 }} />
                ))}
            </div>
            <p className="mt-2 text-xs text-neutral-500">{config.range_note}</p>
        </section>
    );
}
