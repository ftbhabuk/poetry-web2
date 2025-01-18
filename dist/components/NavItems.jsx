'use client';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { PRODUCT_CATEGORIES } from '@/config';
var NavItems = function () {
    var _a = useState(null), activeIndex = _a[0], setActiveIndex = _a[1];
    useEffect(function () {
        var handler = function (e) {
            if (e.key === 'Escape') {
                setActiveIndex(null);
            }
        };
        document.addEventListener('keydown', handler);
        return function () {
            document.removeEventListener('keydown', handler);
        };
    }, []);
    var isAnyOpen = activeIndex !== null;
    var navRef = useRef(null);
    useOnClickOutside(navRef, function () { return setActiveIndex(null); });
    return (<div className='flex gap-4 h-full'>
      {PRODUCT_CATEGORIES.map(function (category, i) {
            var handleOpen = function () {
                if (activeIndex === i) {
                    setActiveIndex(null);
                }
                else {
                    setActiveIndex(i);
                }
            };
            var close = function () { return setActiveIndex(null); };
            var isOpen = i === activeIndex;
            return (<NavItem category={category} close={close} handleOpen={handleOpen} isOpen={isOpen} key={category.value} isAnyOpen={isAnyOpen}/>);
        })}
    </div>);
};
export default NavItems;
