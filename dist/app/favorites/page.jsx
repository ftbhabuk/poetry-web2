'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Button } from '@/components/ui/button';
import { PRODUCT_CATEGORIES } from '@/config';
import { useCart } from '@/hooks/use-cart';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StyledProductDescription from '@/components/ui/styledPD';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ReadingRecommendations from '@/components/ReadingR';
import EnhancedHeading from '@/components/EnhancedHeading';
var Page = function () {
    var _a = useCart(), items = _a.items, removeItem = _a.removeItem, validateItems = _a.validateItems;
    var router = useRouter();
    var _b = useState(true), isLoading = _b[0], setIsLoading = _b[1];
    useEffect(function () {
        var validate = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        return [4 /*yield*/, validateItems()];
                    case 1:
                        _a.sent();
                        setIsLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        validate();
    }, [validateItems]);
    var handleCategoryClick = function (category) {
        router.push("/products?category=".concat(category));
    };
    var handleAuthorClick = function (author) {
        router.push("/products?author=".concat(encodeURIComponent(author)));
    };
    if (isLoading) {
        return (<MaxWidthWrapper>
        <div className='flex h-[calc(100vh-200px)] items-center justify-center'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      </MaxWidthWrapper>);
    }
    return (<MaxWidthWrapper>
      <div className='bg-transparent'>
        <EnhancedHeading />
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <div className='flex flex-col'>
            <br />
            {/* Main content area */}
            <div className='flex-grow'>
              {items.length === 0 ? (<div className='bg-gray-50 flex h-64 flex-col items-center justify-center space-y-1 rounded-lg border-2 border-dashed border-zinc-200 p-12'>
                  <div aria-hidden='true' className='relative mb-4 h-40 w-40 text-muted-foreground'>
                    <Image src='/hippo-empty-cart.png' fill loading='eager' alt='empty shopping cart hippo'/>
                  </div>
                  <h3 className='font-semibold text-2xl'>You have no favorites yet 😢</h3>
                  <p className='text-muted-foreground text-center'>
                    Whoops! Nothing to show here yet.
                  </p>
                </div>) : (<ul className='space-y-8'>
                  {items.map(function (_a) {
                var _b;
                var product = _a.product;
                var label = (_b = PRODUCT_CATEGORIES.find(function (c) { return c.value === product.category; })) === null || _b === void 0 ? void 0 : _b.label;
                var image = product.images[0].image;
                return (<li key={product.id} className='bg-white bg-opacity-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'>
                        <div className='p-6'>
                          <div className='flex items-center'>
                            <div className='flex-shrink-0'>
                              <Link href={"/product/".concat(product.id)} className='block relative h-24 w-24 sm:h-32 sm:w-32'>
                                {typeof image !== 'string' && image.url ? (<Image fill src={image.url} alt='product image' className='rounded-md object-cover object-center'/>) : null}
                              </Link>
                            </div>
                            <div className='ml-6 flex-grow'>
                              <h3 className="text-xl font-semibold">
                                <Link href={"/product/".concat(product.id)} className="text-gray-700 hover:text-gray-900 transition-colors duration-150 ease-in-out flex items-center group">
                                  {product.name}
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                  </svg>
                                </Link>
                              </h3>
                              <div className='mt-1 flex items-center'>
                                <button onClick={function () { return handleCategoryClick(product.category); }} className='text-sm text-muted-foreground hover:text-gray-700 transition-colors duration-150 ease-in-out mr-4'>
                                  {label}
                                </button>
                                <button 
                //  @ts-ignore
                onClick={function () { return handleAuthorClick(product.author); }} className='text-sm text-muted-foreground hover:text-gray-700 transition-colors duration-150 ease-in-out flex items-center group'>
                                  
                                  {//@ts-ignore
                    product.author}
                                  
                                </button>
                              </div>
                            </div>
                            <Button aria-label='remove product' onClick={function () { return removeItem(product.id); }} variant='ghost' className='ml-4'>
                              <X className='h-5 w-5' aria-hidden='true'/>
                            </Button>
                          </div>
                          
                          {/* Product Description */}
                          <div className='mt-4'>
                            
                            <StyledProductDescription descriptionHtml={
                    //@ts-ignore
                    product.description_html}/>
                          </div>
                        </div>
                      </li>);
            })}
                </ul>)}
            </div>

            {/* Donation Section */}
            <div className='mt-8'>
             <ReadingRecommendations />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>);
};
export default Page;
