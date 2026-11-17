'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Makes every framer-motion animation honour the OS "reduce motion" setting:
 * transform and layout animations are skipped, simple opacity fades are kept.
 */
export default function MotionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
