"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  Menu, X, ChevronLeft, ChevronDown, ChevronRight, 
  Home, BookOpen, Settings, User
} from "lucide-react"

export type TopicLink = {
  name: string
  href: string
}

export type SubjectCategory = {
  name: string
  href?: string
  links?: TopicLink[]
}

export type SidebarProps = {
  subjectName: string
  categories: SubjectCategory[]
}

export default function SubjectSidebar({ subjectName, categories }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    // Open all categories by default
    const initial: Record<string, boolean> = {}
    categories.forEach(cat => {
      initial[cat.name] = true
    })
    return initial
  })

  // Close sidebar on mobile when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
    
    // Initial check
    handleResize()
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleCategory = (catName: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }))
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle button (always visible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 z-50 p-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all duration-300 ${
          isOpen ? 'left-64 md:left-[260px]' : 'left-4'
        }`}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen bg-[#0f1115] border-r border-[#1f2229] text-sm flex flex-col z-40 transition-all duration-300 w-64 md:w-[260px] shadow-[4px_0_24px_rgba(0,0,0,0.5)] ${
          isOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-[260px] md:w-0 md:opacity-0 overflow-hidden"
        }`}
      >
        {/* Top actions */}
        <div className="p-4 border-b border-[#1f2229] flex flex-col gap-3 relative overflow-hidden">
          {/* Subtle gradient accent for the top */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />

          <Link 
            href="/learn"
            className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-white/[0.04] text-neutral-300 hover:text-white transition-all group relative z-10"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Back to Subjects</span>
          </Link>
          
          <div className="px-2 pb-1">
            <h2 className="text-lg font-semibold text-white truncate">
              {subjectName}
            </h2>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name}>
                {category.links ? (
                  // Category with sub-links
                  <div className="mb-2">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="flex items-center justify-between w-full px-3 py-2 text-[11px] font-bold text-neutral-500 hover:text-neutral-300 transition-colors group tracking-widest rounded-md hover:bg-white/5"
                    >
                      <span className="uppercase">{category.name}</span>
                      {openCategories[category.name] ? (
                        <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-transform" />
                      ) : (
                        <ChevronRight size={14} className="opacity-50 group-hover:opacity-100 transition-transform" />
                      )}
                    </button>

                    {openCategories[category.name] && (
                      <ul className="mt-1 space-y-[2px]">
                        {category.links.map(link => {
                          const active = pathname === link.href
                          return (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-transparent ${
                                  active
                                    ? "bg-blue-500/10 text-blue-300 border-blue-500/20 font-medium shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                                    : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                                }`}
                              >
                                <BookOpen size={14} className={active ? "text-blue-400" : "text-neutral-600"} />
                                <span className="truncate">{link.name}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                ) : category.href ? (
                  // Single link category
                  <div className="mb-2">
                    <Link
                      href={category.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-transparent ${
                        pathname.startsWith(category.href)
                          ? "bg-blue-500/10 text-blue-300 border-blue-500/20 font-medium shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                          : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                      }`}
                    >
                      <BookOpen size={14} className={pathname.startsWith(category.href) ? "text-blue-400" : "text-neutral-600"} />
                    <span className="truncate">{category.name}</span>
                  </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom user section */}
        <div className="p-4 border-t border-[#1f2229] bg-[#0c0d10]">
          <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 text-neutral-300 transition-all border border-transparent hover:border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
              <User size={18} />
            </div>
            <div className="flex flex-col items-start truncate overflow-hidden">
              <span className="text-sm font-semibold truncate w-full text-left text-white">Student Account</span>
              <span className="text-xs text-blue-400">Pro tier</span>
            </div>
            <Settings size={16} className="ml-auto text-neutral-500 group-hover:text-white transition-colors" />
          </button>
        </div>
      </aside>
      
      {/* Styles for custom scrollbar hidden here for cleaner code, usually added to globals.css */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #444;
        }
      `}} />
    </>
  )
}
