"use client"

import SubjectSidebar, { SidebarProps } from "./SubjectSidebar"
import AIChat from "./AIChat"

type SubjectLayoutProps = SidebarProps & {
  children: React.ReactNode
}

export default function SubjectLayout({ children, ...sidebarProps }: SubjectLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-73px)] w-full bg-[#0f1115] overflow-hidden">
      <SubjectSidebar {...sidebarProps} />
      
      <main className="flex-1 flex min-w-0 h-full">
        
        {/* Lesson Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="max-w-4xl mx-auto w-full pt-10 px-6 md:px-10 pb-20">
            {children}
          </div>
        </div>

        {/* AI Chat Area (Right Side Pane) */}
        <div className="w-[380px] hidden xl:flex flex-col shrink-0">
          <AIChat />
        </div>

      </main>
    </div>
  )
}
