import { useEffect, useRef } from 'react'
import { useReactToPrint } from "react-to-print";


export default function PrintContent() {
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    useEffect(() => {
        reactToPrintFn()
    }, [])
    return (
        <div ref={contentRef} >
            
        </div>
    )
}