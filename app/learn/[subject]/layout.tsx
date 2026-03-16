"use client"

import { useParams } from "next/navigation"
import SubjectLayout from "../components/SubjectLayout"
import { useMemo } from "react"

const subjectData: Record<string, { title: string, categories: any[] }> = {
  physics: {
    title: "Physics",
    categories: [
      { name: "Mechanics", href: "/learn/physics/mechanics" },
      { name: "Electromagnetism", href: "/learn/physics/electromagnetism" },
      { name: "Thermodynamics", href: "/learn/physics/thermodynamics" },
      { name: "Waves", href: "/learn/physics/waves" }
    ]
  },
  mathematics: {
    title: "Mathematics",
    categories: [
      { name: "Calculus", href: "/learn/mathematics/calculus" },
      { name: "Linear Algebra", href: "/learn/mathematics/linear-algebra" },
      { name: "Probability", href: "/learn/mathematics/probability" }
    ]
  },
  programming: {
    title: "Programming",
    categories: [
      {
        name: "Frontend",
        links: [
          { name: "React Basics", href: "/learn/programming/react-basics" },
          { name: "Next.js routing", href: "/learn/programming/nextjs-routing" }
        ]
      },
      {
        name: "Backend",
        links: [
          { name: "Database Design", href: "/learn/programming/database-design" },
          { name: "Node.js API", href: "/learn/programming/nodejs-api" }
        ]
      }
    ]
  }
}

export default function DynamicSubjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const subjectKey = (params?.subject as string)?.toLowerCase() || ""

  const data = useMemo(() => {
    return subjectData[subjectKey] || {
      title: subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1),
      categories: [
        { name: "Introduction", href: `/learn/${subjectKey}/introduction` },
        { name: "Advanced Concepts", href: `/learn/${subjectKey}/advanced-concepts` }
      ]
    }
  }, [subjectKey])

  return (
    <SubjectLayout subjectName={data.title} categories={data.categories}>
      {children}
    </SubjectLayout>
  )
}
