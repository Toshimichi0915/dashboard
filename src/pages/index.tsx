import { World } from "@/components/World"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const sunHidden = { elevation: -2, azimuth: 140 }
const sunShown = { elevation: -0.5, azimuth: 140 }

interface Project {
  name: string
  url: string
  image: string
}

const projects = [
  { name: "JMSL", url: "https://mclist.jp", image: "/jmsl.png" },
  { name: "Earth2B2T (DEAD)", url: "https://2b2t.earth", image: "/earth2b2t.png" },
]

const information = [
  { name: "GitHub", url: "https://github.com/Toshimichi0915", image: "/git.png" },
  { name: "Coconala", url: "https://coconala.com/services/883569", image: "/coconala.png" },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.url}>
      <div className="flex gap-4 m-4 items-center hover:text-emerald-300 transition-colors duration-150">
        <Image src={project.image} alt="" width={40} height={40} />
        <p className="text-[1.3rem] whitespace-nowrap">{project.name}</p>
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
      <div
        className="grid place-items-center"
        style={{
          width: "100dvw",
          height: "100dvh",
        }}
      >
        <div className="w-5/6 lg:w-2/3 xl:w-1/3">
          <main className="p-8 rounded-lg bg-black bg-opacity-50 text-white backdrop-blur-md shadow-[0_0px_4px_rgba(0,0,0,1)] w-full">
            {mainShown ? (
              <>
                <h1 className="text-[1.8rem] mb-4 font-bold">Toshimichi</h1>
                <div className="flex flex-col md:flex-row">
                  <section className="flex-1">
                    <h2 className="text-[1.5rem]">Projects</h2>
                    {projects.map((project) => (
                      <ProjectCard project={project} />
                    ))}
                  </section>
                  <section className="flex-1">
                    <h2 className="text-[1.5rem]">Information</h2>
                    {information.map((project) => (
                      <ProjectCard project={project} key={project.name} />
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
