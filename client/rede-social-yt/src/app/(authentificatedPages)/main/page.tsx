'use client'

import Feed from "@/components/Feed";
import Share from "@/components/Share";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import { IPost } from "@/interfaces";



function Main() {

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ['posts'],
        queryFn: ()=>
        makeRequest.get("post/").then((res)=>{
            return res.data.data;
        })
    })

    if(postQuery.error){
        console.log(postQuery.error)
    }

    return  (
    <div className="w-2/6 flex flex-col gap-5">
        < Share />
        <Feed post={postQuery.data} />
    </div>
    )
}

export default Main;