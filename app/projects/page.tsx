import Projects from "@/components/projects"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      <Projects />
      <Footer />
    </main>
  )
}

