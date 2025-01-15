'use client';
import { Button, buttonVariants, } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { AuthCredentialsValidator, } from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';
var Page = function () {
    var _a = useForm({
        resolver: zodResolver(AuthCredentialsValidator),
    }), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.formState.errors;
    var router = useRouter();
    var _b = trpc.auth.createPayloadUser.useMutation({
        onError: function (err) {
            var _a;
            if (((_a = err.data) === null || _a === void 0 ? void 0 : _a.code) === 'CONFLICT') {
                toast.error('This email is already in use. Sign in instead?');
                return;
            }
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message);
                return;
            }
            toast.error('Something went wrong. Please try again.');
        },
        onSuccess: function (data) {
            var sentToEmail = data.sentToEmail;
            toast.success("Verification email sent to ".concat(sentToEmail, "."));
            router.push('/verify-email?to=' + sentToEmail);
        },
    }), mutate = _b.mutate, isLoading = _b.isLoading;
    // const {data} = trpc.anyApiRoute.useQuery()
    // console.log(data)
    var onSubmit = function (_a) {
        var email = _a.email, password = _a.password;
        mutate({ email: email, password: password });
    };
    return (<>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            {/* <Icons.logo className='h-20 w-20' /> */}
            
          <Image src="/favicon.ico" alt="Logo" width={80} height={80} className="h-20 w-20" priority/>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Create an account
            </h1>

            <Link className={buttonVariants({
            variant: 'link',
            className: 'gap-1.5',
        })} href='/sign-in'>
              Already have an account? Sign-in
              <ArrowRight className='h-4 w-4'/>
            </Link>
          </div>

          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input {...register('email')} className={cn({
            'focus-visible:ring-red-500': errors.email,
        })} placeholder='you@example.com'/>
                  {(errors === null || errors === void 0 ? void 0 : errors.email) && (<p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>)}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input {...register('password')} type='password' className={cn({
            'focus-visible:ring-red-500': errors.password,
        })} placeholder='Password'/>
                  {(errors === null || errors === void 0 ? void 0 : errors.password) && (<p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>)}
                </div>

                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>);
};
export default Page;
