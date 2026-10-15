'use client';

import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Github } from 'lucide-react';
import { useMessages } from '@/lib/i18n/useMessages';

type ContactKind = 'phone' | 'email';

export default function ContactButtons({ phone, email, github }: { phone?: string; email?: string; github?: string }) {
    const messages = useMessages();
    const [active, setActive] = useState<ContactKind | null>(null);
    const [pinned, setPinned] = useState<ContactKind | null>(null);
    const contacts = [
        { kind: 'phone' as const, label: messages.profile.phone, value: phone, Icon: PhoneIcon },
        { kind: 'email' as const, label: messages.profile.email, value: email, Icon: EnvelopeIcon },
    ].filter(contact => contact.value);

    return (
        <>
            {contacts.map(({ kind, label, value, Icon }) => (
                <div
                    key={kind}
                    className="relative"
                    onMouseEnter={() => { setActive(kind); setPinned(current => current === kind ? current : null); }}
                    onMouseLeave={() => { if (pinned !== kind) setActive(current => current === kind ? null : current); }}
                    onFocus={() => setActive(kind)}
                    onBlur={event => {
                        if (!event.currentTarget.contains(event.relatedTarget) && pinned !== kind) {
                            setActive(current => current === kind ? null : current);
                        }
                    }}
                    onKeyDown={event => { if (event.key === 'Escape') { setActive(null); setPinned(null); } }}
                >
                    <button
                        type="button"
                        aria-label={label}
                        aria-expanded={active === kind}
                        aria-describedby={active === kind ? `profile-${kind}-tooltip` : undefined}
                        onClick={() => {
                            const close = pinned === kind;
                            setActive(close ? null : kind);
                            setPinned(close ? null : kind);
                        }}
                        className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-link transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                    >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {active === kind && (
                        <div id={`profile-${kind}-tooltip`} role="tooltip" className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 z-30">
                            <div className="card-bg border rounded-lg shadow-lg px-4 py-3 text-center text-sm text-primary whitespace-nowrap">
                                <p className="font-semibold mb-1">{label}</p>
                                <p>{value}</p>
                                {kind === 'email' && (
                                    <a href={`mailto:${value}`} className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded bg-primary text-background hover:bg-primary-dark dark:hover:bg-primary-light">
                                        <EnvelopeIcon className="h-3 w-3" aria-hidden="true" />
                                        {messages.profile.sendEmail}
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-link transition-colors focus-visible:outline-2 focus-visible:outline-accent">
                    <Github className="h-5 w-5" aria-hidden="true" />
                </a>
            )}
        </>
    );
}
