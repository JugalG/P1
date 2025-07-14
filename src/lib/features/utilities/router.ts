'use client';

import { useRouter } from "next/navigation";

export default function usePageRouter(){
    const router = useRouter();

    function pageRouter(path: string){
        router.push(path);
    }
    return pageRouter;    
}