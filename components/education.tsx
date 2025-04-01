"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award } from "lucide-react"
import * as THREE from "three"

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "RJ College of Arts, Science, and Commerce",
    period: "06/2021 - 04/2024",
    grade: "CGPA: 8.64",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "RJ College of Arts, Science, and Commerce",
    period: "06/2019 - 05/2021",
    grade: "83.40%",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Shivam Vidya Mandir, Mumbai",
    period: "06/2018 - 03/2019",
    grade: "87.80%",
  },
]

const certifications = [
  {
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    description:
      "An intensive Python programming course covering data analytics, web development, and data structures. Developed practical skills through daily coding challenges and projects, including data visualization, API integration, and automation scripts. Gained proficiency in Python libraries such as Pandas, NumPy, and Matplotlib for data analysis and visualization.",
  },
  {
    title: "Advanced Data Analytics Certification",
    description:
      "Comprehensive training in statistical analysis, data visualization, and machine learning techniques. Mastered advanced concepts in predictive modeling, hypothesis testing, and data-driven decision making. Completed hands-on projects applying various machine learning algorithms to real-world business problems, including regression analysis, classification, and clustering techniques for market segmentation.",
  },
]

export default function Education() {
  const floatingObjectsRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!floatingObjectsRef.current) return

    // Create a scene
    const scene = new THREE.Scene()

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    // Clear the container and append the renderer
    floatingObjectsRef.current.innerHTML = ""
    floatingObjectsRef.current.appendChild(renderer.domElement)

    // Create floating objects
    const objects = []

    // Create graduation cap
    const capGeometry = new THREE.ConeGeometry(0.5, 0.5, 4)
    const capMaterial = new THREE.MeshBasicMaterial({ color: 0x5b8def, wireframe: true })
    const cap = new THREE.Mesh(capGeometry, capMaterial)
    cap.position.set(-5, 2, -10)
    scene.add(cap)
    objects.push({ mesh: cap, rotationSpeed: 0.01, floatSpeed: 0.005, floatRange: 0.5, floatOffset: 0 })

    // Create book
    const bookGeometry = new THREE.BoxGeometry(1, 0.1, 0.7)
    const bookMaterial = new THREE.MeshBasicMaterial({ color: 0x5b8def, wireframe: true })
    const book = new THREE.Mesh(bookGeometry, bookMaterial)
    book.position.set(5, -2, -8)
    scene.add(book)
    objects.push({ mesh: book, rotationSpeed: 0.01, floatSpeed: 0.003, floatRange: 0.3, floatOffset: Math.PI / 2 })

    // Create certificate
    const certGeometry = new THREE.PlaneGeometry(1, 0.7)
    const certMaterial = new THREE.MeshBasicMaterial({ color: 0x5b8def, wireframe: true, side: THREE.DoubleSide })
    const certificate = new THREE.Mesh(certGeometry, certMaterial)
    certificate.position.set(-4, -3, -12)
    scene.add(certificate)
    objects.push({ mesh: certificate, rotationSpeed: 0.008, floatSpeed: 0.004, floatRange: 0.4, floatOffset: Math.PI })

    // Create atom (for science)
    const atomGroup = new THREE.Group()
    const nucleusGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const nucleusMaterial = new THREE.MeshBasicMaterial({ color: 0x5b8def, wireframe: true })
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial)
    atomGroup.add(nucleus)

    // Create electron orbits
    for (let i = 0; i < 3; i++) {
      const orbitGeometry = new THREE.TorusGeometry(0.5 + i * 0.2, 0.02, 16, 100)
      const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x5b8def, wireframe: true })
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit.rotation.x = (Math.PI / 2) * i
      atomGroup.add(orbit)
    }

    atomGroup.position.set(4, 3, -15)
    scene.add(atomGroup)
    objects.push({
      mesh: atomGroup,
      rotationSpeed: 0.005,
      floatSpeed: 0.002,
      floatRange: 0.6,
      floatOffset: Math.PI / 4,
    })

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      objects.forEach((obj) => {
        // Rotation
        obj.mesh.rotation.x += obj.rotationSpeed
        obj.mesh.rotation.y += obj.rotationSpeed * 0.7

        // Floating motion
        obj.mesh.position.y += Math.sin(elapsedTime * obj.floatSpeed + obj.floatOffset) * 0.01 * obj.floatRange
      })

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
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
      if (floatingObjectsRef.current && floatingObjectsRef.current.firstChild) {
        floatingObjectsRef.current.removeChild(floatingObjectsRef.current.firstChild)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <div ref={floatingObjectsRef} className="absolute inset-0 -z-10"></div>

      {/* Glassmorphism background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="mb-12 text-center mx-auto">
          <div className="backdrop-blur-sm p-4 rounded-xl bg-background/30 border border-white/10 inline-block">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Education & Certifications</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              My academic background and professional certifications that have shaped my expertise in data science and
              analytics.
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <GraduationCap className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-lg -z-10 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((item, index) => (
                <Card
                  key={index}
                  className="bg-background/50 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardHeader>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <CardTitle>{item.degree}</CardTitle>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {item.period}
                      </Badge>
                    </div>
                    <CardDescription>{item.institution}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-primary">{item.grade}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <Award className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-lg -z-10 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold">Certifications</h3>
            </div>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className="bg-background/50 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardHeader>
                    <CardTitle>{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

