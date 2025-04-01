"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Sales & Revenue Dashboard",
    description:
      "Designed an interactive sales dashboard in Looker Studio, integrating Google Sheets as a data source. Enhanced system efficiency by streamlining data processes, reducing reporting turnaround time from 3 days to 1 day. Provided real-time sales insights, top-performing products, and region-wise sales distribution.",
    image: "/images/sales-dashboard.png",
    tags: ["Looker Studio", "Google Sheets", "SQL", "Data Visualization"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Inventory & Order Management System Optimization",
    description:
      "Automated IMS & FMS workflows using Google Apps Script, reducing manual data entry by 70%. Created customized reports and alerts for stock levels, improving order management efficiency. Optimized CRM integration by ensuring seamless data flow between systems, resulting in better inventory tracking and reduced stockouts.",
    image: "/images/inventory-management.png",
    tags: ["Google Sheets", "Apps Script", "SQL", "Automation", "CRM Integration"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Customer Segmentation Analysis",
    description:
      "Applied clustering algorithms to segment customers based on purchasing behavior, demographics, and engagement metrics. Created visualizations to help marketing teams target specific customer groups. Implemented RFM (Recency, Frequency, Monetary) analysis to identify high-value customers and those at risk of churning.",
    image: "/images/customer-segmentation.png",
    tags: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Clustering"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Predictive Sales Forecasting Model",
    description:
      "Developed a machine learning model to predict future sales based on historical data, seasonal trends, and external factors. Achieved 85% accuracy in 3-month forecasts. Implemented time series analysis techniques including ARIMA, Prophet, and ensemble methods to improve prediction accuracy across different product categories.",
    image: "/images/sales-forecasting.png",
    tags: ["Python", "Pandas", "Time Series Analysis", "Regression", "Visualization"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "E-commerce Website with Analytics Dashboard",
    description:
      "Built a full-stack e-commerce website with an integrated analytics dashboard showing real-time sales data, customer behavior, and inventory status. Implemented user behavior tracking to provide insights on product popularity, conversion rates, and customer journey mapping to optimize the shopping experience.",
    image: "/images/ecommerce-analytics.png",
    tags: ["JavaScript", "React", "Node.js", "SQL", "Data Visualization"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Automated Data Cleaning Pipeline",
    description:
      "Created an automated pipeline for cleaning and preprocessing raw data from multiple sources, standardizing formats, handling missing values, and detecting outliers. Implemented data validation rules and quality checks to ensure data integrity. Reduced data preparation time by 60% and improved overall data quality for downstream analytics.",
    image: "/images/data-cleaning.png",
    tags: ["Python", "Pandas", "ETL", "Data Cleaning", "Automation"],
    demoUrl: "#",
    repoUrl: "#",
  },
]

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section id="projects" className="py-20 bg-muted/10 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        {/* Animated gradient blob that follows mouse */}
        <div
          className="hidden lg:block absolute w-64 h-64 rounded-full blur-3xl bg-gradient-to-r from-primary/20 to-blue-500/20 transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x - 128}px`,
            top: `${mousePosition.y - 128}px`,
            opacity: 0.7,
          }}
        ></div>
      </div>

      <div ref={containerRef} className="container px-4 md:px-6 relative">
        <div className="mb-12 text-center mx-auto">
          <div className="backdrop-blur-sm p-4 rounded-xl bg-background/30 border border-white/10 inline-block">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Here are some of the data science and analytics projects I've worked on. Each one showcases different
              aspects of my skills and expertise.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={cn(
                "overflow-hidden transition-all duration-300",
                "bg-background/50 backdrop-blur-md border border-white/10 shadow-lg",
                hoveredIndex === index ? "scale-[1.02] shadow-xl" : "",
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="bg-primary/10 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <a href="https://github.com/Codewithranvijay" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-1 bg-background/50 backdrop-blur-sm">
                    <Github className="h-4 w-4" />
                    Code
                  </Button>
                </a>
                <Button size="sm" className="gap-1 bg-primary/90 backdrop-blur-sm">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="bg-background/50 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

