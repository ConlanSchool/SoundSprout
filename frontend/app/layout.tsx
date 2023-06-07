import './globals.css';
import { Outfit } from 'next/font/google';
import { UserProvider } from './hooks/context/UserContext';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '700'],
});

export const metadata = {
  title: 'Sound Sprout',
  description: 'Discover Unique Sound Samples',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${outfit.className} min-h-screen`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
