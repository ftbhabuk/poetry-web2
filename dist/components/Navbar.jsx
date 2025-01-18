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
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import NavItems from './NavItems';
import { buttonVariants } from './ui/button';
import Cart from './Cart';
import { cookies } from 'next/headers';
import { getServerSideUser } from '@/lib/payload-utils';
import UserAccountNav from './UserAccountNav';
import MobileNav from './MobileNav';
var Navbar = function () { return __awaiter(void 0, void 0, void 0, function () {
    var nextCookies, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nextCookies = cookies();
                return [4 /*yield*/, getServerSideUser(nextCookies)];
            case 1:
                user = (_a.sent()).user;
                return [2 /*return*/, (<div className='sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative' style={{
                            background: '#abbaab',
                            // @ts-ignore
                            background: '-webkit-linear-gradient(to right, #ffffff, #abbaab)',
                            // @ts-ignore
                            background: 'linear-gradient(to right, #ffffff, #abbaab)'
                        }}>
        <MaxWidthWrapper>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <MobileNav />
              <div className='ml-4 flex lg:ml-0 font-semibold'>
                <Link href='/'>
                  <p className='ml-4 flex lg:ml-0 text-gray-800'>
                    Unwhispered<span className="text-green-600">Perhaps..</span>
                  </p>
                </Link>
              </div>
            </div>

            <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
              <NavItems />
            </div>

            <div className='flex items-center'>
              <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                {user ? (<UserAccountNav user={user}/>) : (<>
                    <Link href='/sign-in' className={buttonVariants({
                                variant: 'ghost',
                                className: 'text-gray-700 hover:text-gray-900',
                            })}>
                      Sign in
                    </Link>
                    <span className='h-6 w-px bg-gray-300' aria-hidden='true'/>
                    <Link href='/sign-up' className={buttonVariants({
                                variant: 'ghost',
                                className: 'text-gray-700 hover:text-gray-900',
                            })}>
                      Create account
                    </Link>
                    <span className='h-6 w-px bg-gray-300 mr-2' // Added margin-right for spacing
                         aria-hidden='true'/>
                  </>)}
              </div>
              {/* Cart component moved outside of the hidden div */}
              <div className='ml-4 flow-root'>
                <Cart />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>)];
        }
    });
}); };
export default Navbar;
