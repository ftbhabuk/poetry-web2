import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/config';
import ImageSlider from './ImageSlider';
var ProductListing = function (_a) {
    var _b;
    var product = _a.product, index = _a.index;
    var _c = useState(false), isVisible = _c[0], setIsVisible = _c[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setIsVisible(true);
        }, index * 75);
        return function () { return clearTimeout(timer); };
    }, [index]);
    if (!product || !isVisible)
        return <ProductPlaceholder />;
    var label = (_b = PRODUCT_CATEGORIES.find(function (_a) {
        var value = _a.value;
        return value === product.category;
    })) === null || _b === void 0 ? void 0 : _b.label;
    var validUrls = product.images
        .map(function (_a) {
        var image = _a.image;
        return typeof image === 'string' ? image : image.url;
    })
        .filter(Boolean);
    return (<Link className={cn('invisible h-full w-full cursor-pointer group', {
            'visible animate-in fade-in-5': isVisible,
        })} href={"/product/".concat(product.id)}>
      <div className="relative flex flex-col w-full rounded-lg overflow-hidden transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:scale-105 bg-white/10 hover:bg-white/20 border border-none hover:border-gray-300 backdrop-blur-xl">
        <div className="aspect-square overflow-hidden rounded-lg relative">
          <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 border-none">
            <ImageSlider urls={validUrls} className="w-full h-full object-cover"/>
          </div>
        </div>
        <div className=" pl-2 mt-2 transition-all duration-300 ease-in-out group-hover:translate-x-2">
          <h3 className="font-medium text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300 ease-in-out">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300 ease-in-out">
            {label}
          </p>
        </div>
      </div>
    </Link>);
};
var ProductPlaceholder = function () {
    return (<div className="flex flex-col w-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full"/>
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg"/>
      <Skeleton className="mt-2 w-16 h-4 rounded-lg"/>
      <Skeleton className="mt-2 w-12 h-4 rounded-lg"/>
    </div>);
};
export default ProductListing;
