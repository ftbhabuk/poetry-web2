"use client";
import { ChevronDown, BookOpen, Feather, Quote, PenSquare } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
var ContentContextButton = function (_a) {
    var _b = _a.name, name = _b === void 0 ? 'Untitled' : _b, _c = _a.category, category = _c === void 0 ? 'Uncategorized' : _c, _d = _a.author, author = _d === void 0 ? 'Unknown Author' : _d, _e = _a.themes, themes = _e === void 0 ? [] : _e, _f = _a.excerpt, excerpt = _f === void 0 ? 'No excerpt available' : _f, _g = _a.context, context = _g === void 0 ? '' : _g, _h = _a.publishedDate, publishedDate = _h === void 0 ? '' : _h, _j = _a.descriptionWordCount, descriptionWordCount = _j === void 0 ? 0 : _j, product = _a.product;
    var _k = useState(false), isOpen = _k[0], setIsOpen = _k[1];
    var dropdownRef = useRef(null);
    var displayWordCount = descriptionWordCount || 0;
    useEffect(function () {
        var handleResize = function () {
            if (window.innerWidth >= 768) {
                var timer_1 = setTimeout(function () {
                    setIsOpen(true);
                }, 500);
                return function () { return clearTimeout(timer_1); };
            }
            else {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    var formattedDate = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'Date not available';
    return (<div className="relative flex justify-end w-full" ref={dropdownRef}>
      <button onClick={function () { return setIsOpen(!isOpen); }} className={"group rounded-full shadow-md border border-white/20\n                   transition-all duration-300 hover:shadow-lg hover:scale-105\n                   flex items-center backdrop-blur-sm\n                   hover:border-green-400/20\n                   md:px-6 md:py-3 \n                   px-3 py-2 \n                   ".concat(isOpen ? 'bg-white/30' : 'bg-white/10 hover:bg-white/30')}>
        <span className="text-sm font-semibold text-gray-400 transition-colors duration-300 
                       group-hover:text-green-800 hidden md:block">
          Context
        </span>
        <ChevronDown className={"h-4 w-4 text-gray-400 flex-shrink-0 transition-all duration-300\n                    group-hover:text-green-800 md:ml-2\n                    ".concat(isOpen ? 'rotate-180' : 'rotate-0')}/>
      </button>

      {isOpen && (<div className="absolute top-full right-0 mt-4 rounded-2xl bg-white/30 backdrop-blur-md
                       border border-white/20 shadow-xl transition-all duration-300
                       animate-in slide-in-from-top-5 fade-in-20 z-50
                       sm:w-120 w-80 md:w-96">
          <div className="p-4 space-y-4 max-h-[80vh]">
            <div className="space-y-1">
              <h3 className="text-lg font-serif text-gray-700">{name}</h3>
              <p className="text-sm text-gray-400">{formattedDate}</p>
            </div>

            <div className="space-y-3 overflow-y-auto pr-2 max-h-[60vh] 
                          [&::-webkit-scrollbar]:w-1.5
                          [&::-webkit-scrollbar-track]:bg-transparent
                          [&::-webkit-scrollbar-thumb]:bg-white/20
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar]:hover:w-1.5
                          [&::-webkit-scrollbar-thumb]:hover:bg-white/30
                          hover:[&::-webkit-scrollbar-thumb]:bg-white/40
                          transition-all duration-300">
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="group relative">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40
                                text-gray-600 hover:text-green-800 hover:bg-white/50 
                                transition-all duration-200 shadow-sm
                                hover:shadow-md hover:scale-105">
                    <BookOpen className="h-4 w-4"/>
                    <span className="text-sm">{category}</span>
                  </div>
                </div>

                <div className="group relative">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40
                                text-gray-600 hover:text-green-800 hover:bg-white/50 
                                transition-all duration-200 shadow-sm
                                hover:shadow-md hover:scale-105">
                    <span className="text-sm"> ©{author}</span>
                  </div>
                </div>

                {displayWordCount > 0 && (<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 
                                text-gray-600 hover:text-green-800 hover:bg-white/50 
                                transition-all duration-200 shadow-sm 
                                hover:shadow-md hover:scale-105">
                    <PenSquare className="h-4 w-4"/>
                    <span className="text-sm whitespace-nowrap">{displayWordCount} words</span>
                  </div>)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Feather className="h-4 w-4"/>
                  <span className="text-sm">Themes</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {themes.map(function (theme, index) { return (<span key={"".concat(theme, "-").concat(index)} className="px-3 py-1.5 text-sm rounded-full bg-white/40 text-gray-600
                               hover:text-green-800 hover:bg-white/50 transition-all duration-200 
                               cursor-pointer shadow-sm hover:shadow-md hover:scale-105">
                      {theme}
                    </span>); })}
                </div>
              </div>

              {excerpt && (<div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Quote className="h-4 w-4 text-gray-600"/>
                    <h4 className="text-sm font-medium text-gray-600">Excerpt</h4>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 leading-relaxed italic">
                      &ldquo;{excerpt}&rdquo;
                    </div>
                  </div>
                </div>)}

              {context && (<div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <PenSquare className="h-4 w-4 text-gray-600"/>
                    <h4 className="text-sm font-medium text-gray-600">Context</h4>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {context}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>)}
    </div>);
};
export default ContentContextButton;
