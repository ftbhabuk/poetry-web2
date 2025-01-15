import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Bookmark, Star, Heart } from 'lucide-react';
var bookQuotes = [
    { text: "A room without books is like a body without a soul.", author: "Cicero" },
    { text: "The person who deserves most pity is a lonesome one on a rainy day who doesn't know how to read.", author: "Benjamin Franklin" },
    { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" }
];
var iconComponents = [Book, Bookmark, Star, Heart];
var EnhancedHeading = function () {
    var _a = useState(bookQuotes[0]), currentQuote = _a[0], setCurrentQuote = _a[1];
    var _b = useState(0), currentIcon = _b[0], setCurrentIcon = _b[1];
    var _c = useState(true), showIcon = _c[0], setShowIcon = _c[1];
    useEffect(function () {
        var intervalDuration = 7000;
        var interval = setInterval(function () {
            setShowIcon(true);
            setTimeout(function () { return setShowIcon(false); }, 2000);
            setCurrentIcon(function (prevIcon) { return (prevIcon + 1) % iconComponents.length; });
            setCurrentQuote(function (prevQuote) { return bookQuotes[(bookQuotes.indexOf(prevQuote) + 1) % bookQuotes.length]; });
        }, intervalDuration);
        return function () { return clearInterval(interval); };
    }, []);
    var IconComponent = iconComponents[currentIcon];
    return (<div className="text-center mb-12 relative">
      <div className="h-24 mb-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {showIcon ? (<motion.div key="icon" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ duration: 0.5 }}>
              <IconComponent size={24} className="text-green-600"/>
            </motion.div>) : (<motion.div key="quote" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="max-w-md px-4">
              <p className="text-muted-foreground mb-1 text-sm italic leading-relaxed">&ldquo;{currentQuote.text}&rdquo;</p>
              <p className="text-xs text-green-600 font-medium">- {currentQuote.author}</p>
            </motion.div>)}
        </AnimatePresence>
      </div>
      
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight relative">
          <span className="bg-gradient-to-r from-black via-green-800 to-green-600 inline-block text-transparent bg-clip-text">
            Literary Odyssey
          </span>
        </h1>
        <p className="text-sm sm:text-base text-green-700 font-medium tracking-wide">
          Embark on a journey through words
        </p>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-6 text-sm text-gray-600 max-w-md mx-auto">
        Discover your favorites among timeless classics and contemporary gems. 
      </motion.div>
    </div>);
};
export default EnhancedHeading;
