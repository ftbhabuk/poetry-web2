"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductReel from '@/components/ProductReel';
import { PRODUCT_CATEGORIES } from '@/config';
var parse = function (param) {
    return param !== null && param !== void 0 ? param : undefined;
};
var ProductsPage = function () {
    var _a;
    var searchParams = useSearchParams();
    var _b = useState(Date.now()), key = _b[0], setKey = _b[1];
    var sort = parse(searchParams.get('sort'));
    var category = parse(searchParams.get('category'));
    var label = (_a = PRODUCT_CATEGORIES.find(function (_a) {
        var value = _a.value;
        return value === category;
    })) === null || _a === void 0 ? void 0 : _a.label;
    useEffect(function () {
        // Force re-render of ProductReel when searchParams change
        setKey(Date.now());
    }, [searchParams]);
    return (<MaxWidthWrapper>
      <ProductReel key={key} title={label !== null && label !== void 0 ? label : 'Browse digital collections'} query={{
            category: category,
            limit: 40,
            sort: sort === 'recent' || sort === 'oldest'
                ? sort
                : undefined,
        }}/>
    </MaxWidthWrapper>);
};
export default ProductsPage;
