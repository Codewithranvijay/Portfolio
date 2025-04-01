"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import * as THREE from "three"

const experiences = [
  {
    role: "Data Analyst",
    company: "Brownwall Food Pvt Ltd",
    period: "Dec 2025 - Present",
    description:
      "Automated workflows using Google Sheets & Google Apps Script, reducing manual effort by 40% and improving process efficiency, leading to a 2x faster data processing time. Designed and optimized dashboards in Looker Studio for IMS, FMS, and CRM systems. Enhanced system efficiency by streamlining data processes and reporting structures.",
    technologies: ["Google Sheets", "Google Apps Script", "Looker Studio", "Data Analysis", "Dashboard Design"],
  },
  {
    role: "Freelance Web Developer & Data Analyst",
    company: "Self-employed",
    period: "June 2024 - Nov 2024",
    description:
      "Developed and optimized web applications using JavaScript, SQL, React, Node.js. Designed interactive dashboards and reports for data-driven decision-making. Successfully launched 1-2 live websites, handling both frontend and backend development.",
    technologies: ["JavaScript", "SQL", "React", "Node.js", "Data Analysis", "Dashboard Design"],
  },
]

export default function Experience() {
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const animationFrameRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    canvasRef.current.innerHTML = ""
    canvasRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 200
    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x5b8def,
      transparent: true,
      opacity: 0.8,
    })

    const particleMesh = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleMesh)
    particlesRef.current.push(particleMesh)

    // Animation loop
    const animate = () => {
      particlesRef.current.forEach((particles) => {
        particles.rotation.x += 0.0005
        particles.rotation.y += 0.0005
      })

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !renderer || !camera) return

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (canvasRef.current && canvasRef.current.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild)
      }
    }
  }, [])

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <div ref={canvasRef} className="absolute inset-0 -z-10"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="mb-12 text-center mx-auto">
          <div className="backdrop-blur-sm p-4 rounded-xl bg-background/30 border border-white/10 inline-block">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Work Experience</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              My professional journey has equipped me with practical experience in data analysis, visualization, and web
              development.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-primary/20 md:ml-8">
            {experiences.map((experience, index) => (
              <div key={index} className="relative flex items-start">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground md:left-3 shadow-lg shadow-primary/20">
                  {index + 1}
                </div>
                <Card className="ml-12 md:ml-24 bg-background/50 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <CardTitle>{experience.role}</CardTitle>
                        <CardDescription>{experience.company}</CardDescription>
                      </div>
                      <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20">
                        {experience.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{experience.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-background/50 backdrop-blur-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

