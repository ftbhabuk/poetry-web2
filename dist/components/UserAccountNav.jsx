// this needs to be changed to fit suitable page
'use client';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from './ui/dropdown-menu';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
var UserAccountNav = function (_a) {
    var user = _a.user;
    var signOut = useAuth().signOut;
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button variant='ghost' size='sm' className='relative'>
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white w-60' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-black'>
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/publish'>Publish Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={signOut} className='cursor-pointer'>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);
};
export default UserAccountNav;
