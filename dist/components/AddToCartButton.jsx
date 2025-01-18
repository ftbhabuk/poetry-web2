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
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { Star } from 'lucide-react';
var AddToFavoritesButton = function (_a) {
    var product = _a.product;
    var _b = useCart(), addItem = _b.addItem, removeItem = _b.removeItem, items = _b.items, validateItems = _b.validateItems;
    var _c = useState(false), isSuccess = _c[0], setIsSuccess = _c[1];
    var _d = useState(false), isInFavorites = _d[0], setIsInFavorites = _d[1];
    var _e = useState(''), actionText = _e[0], setActionText = _e[1];
    var _f = useState(false), isLoading = _f[0], setIsLoading = _f[1];
    useEffect(function () {
        setIsInFavorites(items.some(function (item) { return item.product.id === product.id; }));
    }, [items, product.id]);
    var handleToggleFavorites = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    if (!isInFavorites) return [3 /*break*/, 1];
                    removeItem(product.id);
                    setActionText('Removed from Favorites!');
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, validateItems()]; // Validate items before adding
                case 2:
                    _a.sent(); // Validate items before adding
                    isValid = items.some(function (item) { return item.product.id === product.id; });
                    if (!isValid) {
                        addItem(product);
                        setActionText('Added to Favorites!');
                    }
                    else {
                        setActionText('Product no longer available');
                    }
                    _a.label = 3;
                case 3:
                    setIsSuccess(true);
                    setIsInFavorites(!isInFavorites);
                    setIsLoading(false);
                    setTimeout(function () {
                        setIsSuccess(false);
                        setActionText('');
                    }, 2000);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<Button onClick={handleToggleFavorites} size='sm' variant='ghost' className='group relative' disabled={isLoading}>
      <Star className={"h-5 w-5 transition-colors ".concat(isInFavorites ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400')}/>
      <span className='absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
        {isSuccess
            ? actionText
            : (isInFavorites ? 'Remove from Favorites' : 'Add to Favorites')}
      </span>
    </Button>);
};
export default AddToFavoritesButton;
