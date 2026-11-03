import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Verb Quest · Small adventures. Big discoveries.', description: 'Learn 100 English irregular verbs through illustrated adventures, picture challenges, and verb trios.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
