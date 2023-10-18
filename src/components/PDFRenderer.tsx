'use client';

import { Loader2 } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css';
import { useToast } from './ui/use-toast';

interface PDFPageProps extends PropsWithChildren{
  url: string
}



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PDFRenderer = ({ url }: PDFPageProps) => {

  const { toast } = useToast();
  
  console.log(url);
  return (
    <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
      <div className='h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2'>
        <div className='flex items-center gap-1.5'>topbar</div>
      </div>

      <div className='flex-1 w-full max-h-screen'>
        <div className='flex flex-row justify-center'>
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
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>

  )
}

export default PDFRenderer;