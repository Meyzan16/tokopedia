import React from 'react'
import { getUserProjects,getUserCategory } from '@lib/actions'
import Image from 'next/image'
import { UserProfile } from '@common.types'
import ProfilePage from '@components/ProfilePage'
import { CategoryInterface } from '@common.types'

type Props = {
    params: {
        id:string
    }
}



const UserProfile = async ({params}: Props) => {
    const result = await getUserProjects(params.id, 100) as {user: UserProfile};


    if(!result.user) {
        return <p className='no-result-text'>failed to fetch user info</p>
    }
    
   return <ProfilePage user={result?.user} userId={params.id} />
}

export default UserProfile
