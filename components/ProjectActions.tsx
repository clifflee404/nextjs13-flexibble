'use client'

import { deleteProject, fetchToken } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ProjectActions = ({projectId}: {projectId: string}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelteProject = async () => {
    setIsDeleting(true)

    const { token } = await fetchToken()

    try {
      await deleteProject(projectId, token)

      router.push('/')
    } catch (error) {
      console.log('---delete failed, error:', error);
    }
  }

  return (
    <>
      <Link href={`/edit-project/${projectId}`} className='flexCenter edit-action_btn'>
        <Image
          src="/pencile.svg"
          width={15}
          height={15}
          alt='edit'
        />
      </Link>

      <button
        type='button'
        className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`}
        onClick={handleDelteProject}
      >
        <Image
          src="/trash.svg"
          width={15}
          height={15}
          alt='edit'
        />
      </button>
    </>
  )
}

export default ProjectActions