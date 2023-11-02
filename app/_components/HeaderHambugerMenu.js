"use client";

import { useEffect } from "react";
import { usePathname } from 'next/navigation'

export default function HeaderHamburgerMenu(props) {
    const pathname = usePathname();
    useEffect(() => {
        let rootPrimaryMenu = document.getElementById('root-primary-menu');
        rootPrimaryMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }, [pathname]);
    useEffect(() => {
        let rootPrimaryMenu = document.getElementById('root-primary-menu');
        rootPrimaryMenu.addEventListener('click', function () {
            rootPrimaryMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }, []);
    return <button id="root-primary-menu">
        <span></span>
        <span></span>
        <span></span>
    </button>;
}