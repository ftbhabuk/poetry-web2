import { cn } from '@/lib/utils';
var MaxWidthWrapper = function (_a) {
    var className = _a.className, children = _a.children;
    return (<div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
      {children}
    </div>);
};
export default MaxWidthWrapper;
