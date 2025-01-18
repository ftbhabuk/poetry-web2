'use client';
import { usePathname } from 'next/navigation';
import Footer from "@/components/Footer";
export default function ClientLayout(_a) {
    var children = _a.children;
    var pathname = usePathname();
    var isAuthPage = pathname === '/sign-up' || pathname === '/sign-in';
    return (<>
      {children}
      {!isAuthPage && <Footer />}
    </>);
}
