'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../../axios";
import Feed from "@/components/Feed";
import { UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";
import { IPost } from "@/interfaces";
import { IFriendship } from "@/interfaces";
import { FaTimesCircle } from 'react-icons/fa'
import AuthInput from "@/components/AuthInput";

function Profile({searchParams}:{searchParams:{id:string}}) {
   
    const { user, setUser }=useContext(UserContext)
    const queryClient = useQueryClient();
    const [followed, setFollowed] = useState(false);

    const [username, setUsername] = useState('');
    const [userImg, setUserImg] = useState('');
    const [bgImg, setBgImg] = useState('');
    const [editProfile, setEditProfile] = useState(false);

    const profileQuery = useQuery({
        queryKey:['profile', searchParams.id],
        queryFn:() => makeRequest.get('users/get-user?id='+searchParams.id).then((res)=>{
            setUsername(res.data[0].username)
            setUserImg(res.data[0].userImg)
            setBgImg(res.data[0].bgImg)
            return res.data[0];
        })
    })
   
    if (profileQuery.error) {
        console.log(profileQuery.error)
    }

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ['posts'],
        queryFn: ()=>
        makeRequest.get("post/?id=" + searchParams.id).then((res)=>{
            return res.data.data;
        })
    })

    if(postQuery.error){
        console.log(postQuery.error)
    }

    const FriendshipQuery = useQuery({
        queryKey:['friendship'],
        queryFn:()=>makeRequest.get('friendship/?follower_id=' + user?.id).then((res)=> {
            res.data.data.find((e:IFriendship)=>{
                if(e.followed_id === +searchParams.id) {
                    setFollowed(true)
                }
            })
            return res.data.data
        })
    })

    if(FriendshipQuery.error) {
        console.log(FriendshipQuery.error)
    }



    const mutation = useMutation({
        mutationFn: async (unfollow: {
            followed_id: number; 
            follower_id: number;
            followed: boolean;
        }) =>{
            if(followed) {
        return await makeRequest
        .delete(
            `friendship/?follower_id=${unfollow.follower_id}&followed_id=${unfollow.followed_id}`
            )
            .then((res)=> {
                setFollowed(false)    
                return res.data
            });
        } else {
            return makeRequest
            .post(
                `friendship/`, {
                    follower_id: unfollow.follower_id, 
                    followed_id: unfollow.followed_id,
                })
            .then((res) => {
                setFollowed(true)
                return res.data
            });
        }
    },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['friendship']})
        },
       })

       const EditProfileMutation = useMutation({
        mutationFn: async (data: { username:string, userImg:string, bgImg:string, id:number }) =>{ 
            return makeRequest
            .put(
                `users/update-user/`, data)
            .then((res) => {
                if (user) {
                    const newUser = {username:data.username, userImg: data.userImg, bgImg: data.bgImg, id: data.id, email:user.email}
                    setUser(newUser)
                    return res.data
                }
            });
    },
        onSuccess:()=>{
            setEditProfile(false)
            queryClient.invalidateQueries({queryKey:['profile', searchParams.id]})
        },
       })

    return (
        <div className="w-3/5 flex flex-col items-center">

            <div className="relative">
                <img className="rounded-xl" 
                src={
                    profileQuery.data?.bgImg 
                        ? profileQuery.data.bgImg 
                        : "https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg" 
                }
                alt="" 
                />
                <div className="flex absolute bottom-[-110px] left-10 items-center">
                    <img 
                    className="w-40 h-40 rounded-full border-zinc-100 border-4" 
                    src={
                        profileQuery.data?.userImg
                            ? profileQuery.data.userImg
                            : "https://img.freepik.com/free-icon/user_318-159711.jpg"      
                    } 
                    alt=""
                    />
                    <span className="text-2xl font-bold pl-2">{profileQuery.data?.username}</span>
                </div>
            </div>
            <div className="pt-36 w-3/5 flex flex-col items-center gap-4">
                {user?.id != +searchParams.id ? (
                    <button onClick={() => 
                        user && 
                        mutation.mutate({
                            followed, 
                            followed_id: +searchParams.id, 
                            follower_id: user.id,
                        })
                    } className={`w-1/2 rounded-md py-2 font-semibold ${followed
                        ? 'bg-zinc-300  hover:text-black'
                        : 'bg-green-600 text-white hover:bg-green-700' 
                    } `}
                    >
                        {followed ? 'Deixar de seguir' : 'Seguir'}
                        </button>
                    ) :
                    <button className={`w-1/2 rounded-md py-2 font-semibold bg-zinc-300 hover:text-black`} onClick={() => setEditProfile(true)}>
                        Editar Perfil        
                    </button>
                    }
                    {editProfile && 
                        <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000094] z-10 flex items-center justify-center">
                            <div className="bg-white w-2/3 rounded-xl flex flex-col items-center">
                                <header className="w-full border-b font-semibold text-lg text-zinc-600 flex justify-between items-center p-2">
                                    Editar Perfil
                                    <button onClick={() => setEditProfile(false)}><FaTimesCircle className="text-red-600"/></button>
                                    </header>
                                    <form className="w-2/3 py-8 flex flex-col gap-8">
                                    <AuthInput label="Nome:" newState={setUsername} />
                                    <AuthInput label="Image do perfil:" newState={setUserImg}/>
                                    <AuthInput label="Image do fundo:" newState={setBgImg}/>
                                    <button className={`w-1/2 rounded-md py-2 font-semibold bg-zinc-300 hover:text-black self-center`} 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        EditProfileMutation.mutate({username, userImg, bgImg, id:+searchParams.id})
                                    }}>
                                     Editar Perfil        
                                   </button>
                                    </form>
                            </div>
                            </div>
                    }
                <Feed post={postQuery.data} />
            </div>
        </div>
    );
}

export default Profile;





