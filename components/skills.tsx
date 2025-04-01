import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  Database,
  Code,
  LineChart,
  BrainCircuit,
  LayoutDashboard,
  FileSpreadsheet,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"

const skills = [
  {
    category: "Data Analysis & Processing",
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    items: [
      "Data Cleaning",
      "Data Wrangling",
      "ETL",
      "Exploratory Data Analysis (EDA)",
      "A/B Testing",
      "Trend Analysis",
    ],
  },
  {
    category: "Programming & Scripting",
    icon: <Code className="h-8 w-8 text-primary" />,
    items: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "SQL", "JavaScript", "Google Apps Script"],
  },
  {
    category: "Data Visualization & BI",
    icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
    items: ["Tableau", "Power BI", "Looker Studio", "Google Sheets", "Dashboard Design", "Interactive Visualizations"],
  },
  {
    category: "Databases",
    icon: <Database className="h-8 w-8 text-primary" />,
    items: ["SQL", "MongoDB", "Database Design", "Query Optimization", "Data Modeling"],
  },
  {
    category: "Machine Learning",
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    items: ["Supervised Learning", "Regression Models", "Clustering", "Predictive Analytics", "Statistical Analysis"],
  },
  {
    category: "Web Development",
    icon: <Globe className="h-8 w-8 text-primary" />,
    items: ["JavaScript", "React", "Node.js", "Frontend Development", "Backend Development"],
  },
  {
    category: "Statistical Analysis",
    icon: <LineChart className="h-8 w-8 text-primary" />,
    items: ["Probability", "Statistical Testing", "Hypothesis Testing", "Correlation Analysis", "Regression Analysis"],
  },
  {
    category: "Automation",
    icon: <FileSpreadsheet className="h-8 w-8 text-primary" />,
    items: ["Google Sheets Automation", "Workflow Optimization", "Process Automation", "Reporting Automation"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            I've developed expertise in various data science and analytics tools and technologies. Here's a snapshot of
            my technical skills and capabilities.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className={cn(
                "overflow-hidden transition-all duration-300 hover:-translate-y-2",
                "bg-background/50 backdrop-blur-md border border-white/10 shadow-lg",
              )}
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative">
                    {skill.icon}
                    <div className="absolute inset-0 bg-primary/20 blur-lg -z-10 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

