// app/community/page.tsx

import LeftNav from "@/components/LeftNav"

import RightSidebar from "@/components/RightSidebar"

import PostComposer from "@/components/PostComposer"

import InfiniteFeed from "@/components/InfiniteFeed"

import StoryBar from "@/components/StoryBar"



export const dynamic = "force-dynamic" // luôn lấy feed mới



export default function CommunityPage() {

  return (

    <main className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-4">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Left navigation */}

        <aside className="hidden lg:block lg:col-span-3">

          <div className="sticky top-20 space-y-4">

            <LeftNav />

          </div>

        </aside>



        {/* Center column: stories + composer + feed */}

        <section className="lg:col-span-6 space-y-4">

          <div className="space-y-4">

            <StoryBar />

            <PostComposer />

          </div>

          <InfiniteFeed />

        </section>



        {/* Right sidebar: contacts / chatbot */}

        <aside className="hidden xl:block lg:col-span-3">

          <div className="sticky top-20 space-y-4">

            <RightSidebar />

          </div>

        </aside>

      </div>

    </main>

  )
}