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
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AuthCredentialsValidator } from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
var Page = function () {
    var searchParams = useSearchParams();
    var router = useRouter();
    var isSeller = searchParams.get('as') === 'seller';
    var origin = searchParams.get('origin');
    useEffect(function () {
        if (origin) {
            localStorage.setItem('intendedDestination', "/".concat(origin));
        }
    }, [origin]);
    var continueAsSeller = function () {
        router.push('?as=seller');
    };
    var continueAsBuyer = function () {
        router.replace('/sign-in', undefined);
    };
    var _a = useForm({
        resolver: zodResolver(AuthCredentialsValidator),
    }), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.formState.errors;
    var _b = trpc.auth.signIn.useMutation({
        onSuccess: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toast.success('Signed in successfully');
                        return [4 /*yield*/, router.refresh()];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            var intendedDestination = localStorage.getItem('intendedDestination');
                            if (intendedDestination) {
                                localStorage.removeItem('intendedDestination');
                                router.push(intendedDestination);
                            }
                            else if (isSeller) {
                                router.push('/publish');
                            }
                            else {
                                router.push('/');
                            }
                            setTimeout(function () {
                                window.location.reload();
                            }, 100);
                        }, 300);
                        return [2 /*return*/];
                }
            });
        }); },
        onError: function (err) {
            var _a;
            if (((_a = err.data) === null || _a === void 0 ? void 0 : _a.code) === 'UNAUTHORIZED') {
                toast.error('Invalid email or password.');
            }
            else {
                toast.error('Something went wrong. Please try again.');
            }
        },
    }), signIn = _b.mutate, isLoading = _b.isLoading;
    var onSubmit = function (_a) {
        var email = _a.email, password = _a.password;
        signIn({ email: email, password: password });
    };
    return (<div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          {/* <Icons.logo className="h-20 w-20" /> */}
          <Image src="/favicon.ico" alt="Logo" width={80} height={80} className="h-20 w-20" priority/>
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your {isSeller ? 'publisher' : ''} account
          </h1>

          <Link className={buttonVariants({
            variant: 'link',
            className: 'gap-1.5',
        })} href="/sign-up">
            Don&apos;t have an account?
            <ArrowRight className="h-4 w-4"/>
          </Link>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1 py-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email')} className={cn({
            'focus-visible:ring-red-500': errors.email,
        })} placeholder="you@example.com"/>
                {(errors === null || errors === void 0 ? void 0 : errors.email) && (<p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>)}
              </div>

              <div className="grid gap-1 py-2">
                <Label htmlFor="password">Password</Label>
                <Input {...register('password')} type="password" className={cn({
            'focus-visible:ring-red-500': errors.password,
        })} placeholder="Password"/>
                {(errors === null || errors === void 0 ? void 0 : errors.password) && (<p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>)}
              </div>

              <Button disabled={isLoading}>
                {isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
                Sign in
              </Button>
            </div>
          </form>

          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <span className="w-full border-t"/>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {isSeller ? (<Button onClick={continueAsBuyer} variant="secondary" disabled={isLoading}>
              Continue as reader
            </Button>) : (<Button onClick={continueAsSeller} variant="secondary" disabled={isLoading}>
              Continue as publisher
            </Button>)}
        </div>
      </div>
    </div>);
};
export default Page;
