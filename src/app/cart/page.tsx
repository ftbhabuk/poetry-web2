'use client'

import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Check, Loader2, X } from 'lucide-react' 
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const { items, removeItem } = useCart()

  const router = useRouter()
// sth sth stripe 
// damn
  // const { mutate: createCheckoutSession, isLoading } =
  //   trpc.payment.createSession.useMutation({
  //     onSuccess: ({ url }) => {
  //       if (url) router.push(url)
  //     },
  //   })

  const productIds = items.map(({ product }) => product.id)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])


  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${category}`)
  }

  const handleAuthorClick = (author: string) => {
    router.push(`/products?author=${encodeURIComponent(author)}`)
  }

  return (
    <div className='bg-transparent'>
      <div className='px-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
      <span className="text-muted-900">Your </span>
      <span className="bg-gradient-to-r from-black via-green-800 to-green-600 inline-block text-transparent bg-clip-text">
        Favorites
      </span>
    </h1>

        <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <div
            className={cn('lg:col-span-7', {
              'rounded-lg border-2 border-dashed border-zinc-200 p-12':
                isMounted && items.length === 0,
            })}>
            <h2 className='sr-only'>
              Your favourite Items 
            </h2>

            {isMounted && items.length === 0 ? (
              <div className='bg-gray-50 flex h-full flex-col items-center justify-center space-y-1'>
                <div
                  aria-hidden='true'
                  className='relative mb-4 h-40 w-40 text-muted-foreground'>
                  <Image
                    src='/hippo-empty-cart.png'
                    fill
                    loading='eager'
                    alt='empty shopping cart hippo'
                  />
                </div>
                <h3 className='font-semibold text-2xl'>
                  You have no favorites yet 😢
                </h3>
                <p className='text-muted-foreground text-center'>
                  Whoops! Nothing to show here yet.
                  {/* kinda some sassy message hai */}
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                'divide-y divide-gray-200 border-b border-t border-gray-200':
                  isMounted && items.length > 0,
              })}>
              {isMounted &&
                items.map(({ product }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    (c) => c.value === product.category
                  )?.label

                  const { image } = product.images[0]

                  return (
                    <li
                      key={product.id}
                      className='flex py-4 sm:py-8 bg-white bg-opacity-10 rounded-lg my-4 shadow-lg hover:shadow-xl transition-shadow duration-300'>
                      <div className='flex-shrink-0'>
                        <Link href={`/product/${product.id}`} className='block relative h-24 w-24'>
                          {typeof image !== 'string' && image.url ? (
                            <Image
                              fill
                              src={image.url}
                              alt='product image'
                              className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                            />
                          ) : null}
                        </Link>
                      </div>

                      <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                          <div>
                            <div className='flex justify-between'>
                              <h3 className="text-lg"> 
                                <Link
                                  href={`/product/${product.id}`} // Ensure this link is correct
                                  className="font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150 ease-in-out flex items-center group"
                                >
                                  {product.name}
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </Link>
                              </h3>
                            </div>

                            <div className='mt-1 flex text-sm'>
                              <button
                                onClick={() => handleCategoryClick(product.category)}
                                className='text-muted-foreground hover:text-gray-700 transition-colors duration-150 ease-in-out text-lg' // Increased size
                              >
                                Category: {label}
                              </button>
                            </div>

                            <p className='mt-1 text-lg font-medium text-gray-900'> 
                              <button
                              // @ts-ignore
                                onClick={() => handleAuthorClick(product.author)}
                                className='hover:text-gray-700 transition-colors duration-150 ease-in-out flex items-center group'
                              >
                                {/* @ts-ignore */}
                                {product.author}
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </button>
                            </p>
                          </div>

                          <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                            <div className='absolute right-0 top-0'>
                              <Button
                                aria-label='remove product'
                                onClick={() =>
                                  removeItem(product.id)
                                }
                                variant='ghost'>
                                <X
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                         
                        </p>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>


           {/* this is another right side table */}

          <section
           className='mt-16 rounded-lg bg-opacity-40 bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>
              Support Our Work
            </h2>

            <p className='text-sm text-gray-600 mb-6'>
              If you've enjoyed using our service, consider buying us a coffee! Your support helps us continue improving and maintaining this platform.
            </p>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <label htmlFor="donationAmount" className='text-sm font-medium text-gray-900'>
                  Enter amount (Rs):
                </label>
                <input
                  type="number"
                  id="donationAmount"
                  min="1"
                  step="1"
                  defaultValue="5"
                  className='rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-24'
                  // Add state management for the donation amount
                />
              </div>

              <Button
                className='w-full'
                size='lg'
                // Add onClick handler for donation
              >
                Donate
              </Button>
            </div>

            <p className='text-xs text-gray-500 mt-4 text-center'>
              Your donation is greatly appreciated!
            </p>
          </section>
          
        </div>
      </div>
    </div>
  )
}

export default Page
