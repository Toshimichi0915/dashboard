import { World } from "@/components/World"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const sunHidden = { elevation: -2, azimuth: 140 }
const sunShown = { elevation: -0.5, azimuth: 140 }

interface Project {
  name: string
  url?: string
  image?: string
}

interface Archive {
  name: string
  description: string
  repoUrl: string
  url?: string
}

const projects: Project[] = [
  { name: "JMSL", url: "https://mclist.jp", image: "/jmsl.png" },
  { name: "Earth2B2T (DEAD)", url: "https://2b2t.earth", image: "/earth2b2t.png" },
]

const information: Project[] = [
  { name: "Blog", url: "https://blog.toshimichi.net/", image: "/blog.png" },
  { name: "Coconala", url: "https://coconala.com/services/883569", image: "/coconala.png" },
  { name: "GitHub", url: "https://github.com/Toshimichi0915", image: "/git.png" },
]

const archives: Archive[] = [
  {
    name: "Example Store",
    description: "Coinbase Commerceによる決済システム",
    repoUrl: "https://github.com/Toshimichi0915/ExampleStore",
    url: "https://example-store-seven.vercel.app/",
  },
  {
    name: "Calculator",
    description: "iPhoneの電卓を再現",
    repoUrl: "https://github.com/Toshimichi0915/calculator",
    url: "https://calculator-six-olive-97.vercel.app/",
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.url ?? ""} target="_blank">
      <div className="flex gap-4 mx-2 my-4 md:mx-4 items-center hover:text-emerald-300 transition-colors duration-150">
        {project.image ? (
          <Image src={project.image} alt="" width={40} height={40} />
        ) : (
          <div className="w-10 h-10"></div>
        )}
        <p className="text-[1.3rem] whitespace-nowrap">{project.name}</p>
      </div>
    </Link>
  )
}

function ArchiveCard({ archive }: { archive: Archive }) {
  return (
    <Link href={archive.url ?? ""} target="_blank">
      <div className="flex gap-4 mx-2 my-4 md:mx-4 items-center">
        <div className="flex gap-4 flex-1 items-center hover:text-emerald-300  transition-colors duration-150">
          <Image src="/public.svg" alt="" width={40} height={40} />
          <div className="flex-1 flex flex-col">
            <p className="text-[1.3rem]">{archive.name}</p>
            <p className="text-[0.9rem]">{archive.description}</p>
          </div>
        </div>
        <Link href={archive.repoUrl} target="_blank">
          <p className="text-[0.9rem] hover:text-emerald-300 transition-colors duration-150">Source Code</p>
        </Link>
      </div>
    </Link>
  )
}

export default function Page() {
  const [params, setParams] = useState(sunHidden)
  const [mainShown, setMainShown] = useState(false)

  return (
    <>
      <World params={params} />
      <div className="grid place-items-center w-screen h-screen overflow-hidden">
        <div className="w-5/6 lg:w-[600px]">
          <main className="p-8 rounded-lg bg-black/50 text-white backdrop-blur-md shadow-[0_0px_4px_rgba(0,0,0,1)] w-full">
            {mainShown ? (
              <>
                <h1 className="text-[1.8rem] mb-4 font-bold">Toshimichi</h1>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <section>
                    <h2 className="text-[1.5rem]">Projects</h2>
                    {projects.map((project) => (
                      <ProjectCard key={project.name} project={project} />
                    ))}
                  </section>
                  <section>
                    <h2 className="text-[1.5rem]">Information</h2>
                    {information.map((project) => (
                      <ProjectCard project={project} key={project.name} />
                    ))}
                  </section>
                  <section className="col-span-2">
                    <h2 className="text-[1.5rem]">Archives</h2>
                    {archives.map((archive) => (
                      <ArchiveCard archive={archive} key={archive.name} />
                    ))}
                  </section>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="text-white hover:text-emerald-300 transition-colors duration-150"
                  onClick={() => {
                    setParams(sunShown)
                    setMainShown(true)
                  }}
                >
                  <span className="text-[1.4rem]">Click to continue</span>
                </button>
              </div>
            )}
          </main>
          <div className="flex justify-end">
            <Link
              href="https://github.com/Toshimichi0915/dashboard"
              target="_blank"
              className="text-white hover:text-emerald-300 transition-colors duration-150 font-sans"
            >
              <p className="px-2 py-1">Source code</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
