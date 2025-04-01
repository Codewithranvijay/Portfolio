"use client"

import { useState, useRef, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mail, MapPin, Phone, Send, Linkedin, Github, AlertCircle, CheckCircle } from "lucide-react"
import * as THREE from "three"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const animationFrameRef = useRef(null)
  const linesRef = useRef([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

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

    // Create connection lines
    const lineCount = 50
    const lines = []

    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry()
      const points = []

      // Create a random line
      const x1 = (Math.random() - 0.5) * 100
      const y1 = (Math.random() - 0.5) * 100
      const z1 = (Math.random() - 0.5) * 50

      const x2 = (Math.random() - 0.5) * 100
      const y2 = (Math.random() - 0.5) * 100
      const z2 = (Math.random() - 0.5) * 50

      points.push(new THREE.Vector3(x1, y1, z1))
      points.push(new THREE.Vector3(x2, y2, z2))

      geometry.setFromPoints(points)

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(`hsl(${(i / lineCount) * 360}, 70%, 60%)`),
        transparent: true,
        opacity: 0.3,
      })

      const line = new THREE.Line(geometry, material)
      scene.add(line)
      lines.push({
        line,
        speed: Math.random() * 0.01 + 0.005,
      })
    }

    linesRef.current = lines

    // Animation loop
    const animate = () => {
      linesRef.current.forEach((lineObj) => {
        lineObj.line.rotation.x += lineObj.speed
        lineObj.line.rotation.y += lineObj.speed * 0.7
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      form.reset()
      setFormStatus({
        type: "success",
        message: "Thank you for your message! I'll get back to you soon.",
      })

      toast({
        title: "Message sent!",
        description: data.message || "Thank you for your message. I'll get back to you soon.",
      })
    } catch (error) {
      console.error("Error sending message:", error)

      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again or contact me directly at ranvijay3325778@gmail.com",
      })

      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <div ref={canvasRef} className="absolute inset-0 -z-10"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="mb-12 text-center mx-auto">
          <div className="backdrop-blur-sm p-4 rounded-xl bg-background/30 border border-white/10 inline-block">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Have a data analysis project in mind or want to discuss potential opportunities? I'd love to hear from
              you!
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <Card className="bg-background/50 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Feel free to reach out through any of these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">ranvijay3325778@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+91 8928375489</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/ranvijay46"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    linkedin.com/in/ranvijay46
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
                  <Github className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">GitHub</p>
                  <a
                    href="https://github.com/Codewithranvijay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    github.com/Codewithranvijay
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Mumbai, India</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and I'll respond as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              {formStatus.type && (
                <Alert
                  className={`mb-6 ${
                    formStatus.type === "success"
                      ? "bg-green-500/10 text-green-500 border border-green-500/20"
                      : "bg-destructive/10 text-destructive border border-destructive/20"
                  }`}
                >
                  {formStatus.type === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{formStatus.type === "success" ? "Success!" : "Something went wrong"}</AlertTitle>
                  <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="bg-background/50 backdrop-blur-sm border-white/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email"
                              {...field}
                              className="bg-background/50 backdrop-blur-sm border-white/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Message subject"
                            {...field}
                            className="bg-background/50 backdrop-blur-sm border-white/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            className="min-h-32 bg-background/50 backdrop-blur-sm border-white/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground pt-0">
              <p>
                Your information will be used solely to respond to your inquiry and will not be shared with third
                parties.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

