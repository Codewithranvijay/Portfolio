"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Mail } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Hero() {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const animationFrameRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 2, isMobile ? 12 : 8) // Move camera further back on mobile
    cameraRef.current = camera

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    // Create data visualization
    const group = new THREE.Group()
    scene.add(group)

    // Scale for mobile
    const scale = isMobile ? 0.7 : 1

    // Create data bars
    for (let i = 0; i < 5; i++) {
      const height = (0.5 + Math.random() * 2) * scale
      const geometry = new THREE.BoxGeometry(0.6 * scale, height, 0.6 * scale)
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${i * 50}, 70%, 60%)`),
      })
      const bar = new THREE.Mesh(geometry, material)
      bar.position.set((i - 2) * scale, height / 2, 0)
      group.add(bar)
    }

    // Create base platform
    const baseGeometry = new THREE.PlaneGeometry(6 * scale, 3 * scale)
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.rotation.x = -Math.PI / 2
    base.position.y = -0.1
    group.add(base)

    // Animation loop
    const animate = () => {
      if (group) {
        group.rotation.y += 0.005
      }

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)

      // Update camera position based on screen size
      camera.position.z = window.innerWidth < 768 ? 12 : 8
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
      if (containerRef.current) {
        if (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild)
        }
      }
    }
  }, [isMobile])

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-background to-background/80"
    >
      <div ref={containerRef} className="absolute inset-0 z-0"></div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          <span className="block">Ranvijay Singh</span>
          <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Data Scientist
          </span>
        </h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground sm:text-xl">
          Proficient in Python, SQL, Tableau, Power BI, and Looker Studio, with expertise in data cleaning, EDA, and
          automation.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a href="/resume/ranvijay-singh-resume.pdf" download="Ranvijay_Singh_Resume.pdf">
            <Button size="lg" className="px-8 gap-2">
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="px-8 gap-2">
              <Mail className="h-4 w-4" />
              Contact Me
            </Button>
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="block">
            <ArrowDown className="h-8 w-8 text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  )
}

