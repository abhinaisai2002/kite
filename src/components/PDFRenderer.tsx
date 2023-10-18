'use client';

import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import React, { PropsWithChildren } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css';
import { useToast } from './ui/use-toast';

import { useResizeDetector } from 'react-resize-detector'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils';


interface PDFPageProps extends PropsWithChildren{
  url: string
}



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PDFRenderer = ({ url }: PDFPageProps) => {

  const { toast } = useToast();


  const [numPages, setNumPages] = React.useState<number>();
  const [currPage, setCurrPage] = React.useState<number>(1)

  const { width, ref } = useResizeDetector();
  
  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine(
        (num) => Number(num) > 0 && Number(num) <= numPages!
      ),
  }) 
  
  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;
    
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page:'1'
    },
    resolver:zodResolver(CustomPageValidator)
  });

  const handlePageSubmit = ({
    page,
  }: TCustomPageValidator) => {
    setCurrPage(Number(page))
    setValue('page', String(page))
  }

  return (
    <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
      <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
        <div className='flex items-center gap-1.5'>
          <Button
            // disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) =>
                prev - 1 > 1 ? prev - 1 : 1
              )
            }}
            variant='ghost'
            aria-label='previous page'>
            <ChevronDown className='h-4 w-4' />
          </Button>

          <div className='flex items-center gap-1.5'>
            <Input
              {...register('page')}
              className={cn(
                'w-12 h-8',
                errors.page && 'focus-visible:ring-red-500'
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(handlePageSubmit)()
                }
              }}
            
            />
            <p className='text-zinc-700 text-sm space-x-1'>
              <span>/</span>
              <span>{numPages ?? 'x'}</span>
            </p>
          </div>

          <Button
            disabled={currPage === numPages || numPages === undefined}
            onClick={() => {
              setCurrPage((prev) => prev + 1 <= numPages! ? prev +1  : numPages!)
            }}
            variant='ghost'
            aria-label='next page'>
            <ChevronUp className='h-4 w-4' />
          </Button>

        </div>
      </div>

      <div className='flex-1 w-full max-h-screen'>
        <div className='flex flex-row justify-center' ref={ref}>
          <Document
            file={url}
            className='max-h-full'
            loading={
              <div>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            }
            onLoadError={() => {
              toast({
                title: 'Error loading PDF',
                description: 'Please try again later',
                variant: 'destructive',
              })
            }}
            onLoadSuccess={({numPages}) => {
              setNumPages(numPages);
            }}
          >
            <Page width={width?width:1} pageNumber={currPage} />
          </Document>
        </div>
      </div>
    </div>

  )
}

export default PDFRenderer;