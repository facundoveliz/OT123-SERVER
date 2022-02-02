import React from "react"
import { MemberPage } from "./Member"

export default function Home() {
  return (
    <main className='flex justify-center items-center w-screen h-screen'>
      <MemberPage
        brand={'Brand Name'}
        logoUrl='https://i.imgur.com/l1kG0LQ.png'
      />
      <h1>Test</h1>
    </main>
  )
}
