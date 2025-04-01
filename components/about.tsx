"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import * as THREE from "three"

export default function About() {
  const orbitRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!orbitRef.current) return

    // Create a scene
    const scene = new THREE.Scene()

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(300, 300)
    renderer.setClearColor(0x000000, 0)

    // Clear the container and append the renderer
    orbitRef.current.innerHTML = ""
    orbitRef.current.appendChild(renderer.domElement)

    // Create a group to hold the particles
    const particleGroup = new THREE.Group()
    scene.add(particleGroup)

    // Create particles
    const particleCount = 100
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8)

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi

      const x = 2 * Math.sin(phi) * Math.cos(theta)
      const y = 2 * Math.sin(phi) * Math.sin(theta)
      const z = 2 * Math.cos(phi)

      const color = new THREE.Color(`hsl(${(i / particleCount) * 360}, 70%, 60%)`)
      const particleMaterial = new THREE.MeshBasicMaterial({ color })

      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      particle.position.set(x, y, z)
      particleGroup.add(particle)
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Animation loop
    const animate = () => {
      particleGroup.rotation.x += 0.003
      particleGroup.rotation.y += 0.005

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (orbitRef.current && orbitRef.current.firstChild) {
        orbitRef.current.removeChild(orbitRef.current.firstChild)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background"></div>

      {/* Glassmorphism decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="backdrop-blur-sm p-6 rounded-2xl bg-background/30 border border-white/10 shadow-lg">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hello! I'm Ranvijay, a passionate Data Scientist with expertise in data analysis, visualization, and
                machine learning.
              </p>
              <p>
                I specialize in transforming complex data into actionable insights through Python, SQL, and various BI
                tools. My experience includes automating workflows, designing interactive dashboards, and optimizing
                data processes.
              </p>
              <p>
                I'm skilled in creating data-driven solutions that help businesses make informed decisions and improve
                operational efficiency. Currently, I'm advancing my knowledge in AI-driven analytics and machine
                learning.
              </p>
              <p>
                When I'm not working with data, I enjoy developing web applications and exploring new technologies in
                the data science field.
              </p>
            </div>
            <div className="mt-6">
              <a href="/resume/ranvijay-singh-resume.pdf" download="Ranvijay_Singh_Resume.pdf">
                <Button
                  variant="outline"
                  className="gap-2 bg-background/50 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-lg transition-all"
                >
                  <FileText className="h-4 w-4" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-primary/20 sm:h-96 sm:w-96 shadow-2xl">
                <img src="/images/profile.png" alt="Ranvijay Singh" className="h-full w-full object-cover" />
              </div>

              {/* 3D orbit animation around the profile */}
              <div ref={orbitRef} className="absolute inset-0 -z-10" style={{ transform: "scale(1.5)" }}></div>

              {/* Glassmorphism accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

