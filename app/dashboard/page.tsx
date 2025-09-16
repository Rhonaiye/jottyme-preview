import React from 'react'
import Sidebar from '../components/ui/sideBar'
import { 
  CirclePlay, 
  ChevronRight, 
  Link, 
  Users, 
  Upload, 
  Shield, 
  Zap, 
  TrendingUp,
  MessageSquare,
  Folder,
  Clock,
  User
} from 'lucide-react'

function Page() {
  const whyTeamsChoose = [
    {
      icon: <MessageSquare className="h-6 w-6 text-[#51A2FF]" />,
      title: "Precision Feedback",
      description: "Leave contextual comments exactly where needed - no more vague feedback or confusion"
    },
    {
      icon: <Zap className="h-6 w-6 text-[#00D492]" />,
      title: "Visual Markup",
      description: "Draw, highlight, and annotate directly on designs for crystal-clear communication"
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Team Collaboration",
      description: "Centralize all feedback and discussions in one organized, searchable workspace"
    }
  ]

  const recentProjects = [
    { 
      name: "Invena - Creative Agency", 
      updated: "Updated 2h ago",
      icon: <Folder className="h-4 w-4 text-[#6A49FC]" />
    },
    { 
      name: "Redox - Design Agency", 
      updated: "Updated 1d ago",
      icon: <Folder className="h-4 w-4 text-[#51A2FF]" />
    },
    { 
      name: "Redox - Parallax Carousel", 
      updated: "Updated 2d ago",
      icon: <Folder className="h-4 w-4 text-[#00D492]" />
    },
    { 
      name: "Redox - IT Solutions", 
      updated: "Updated 3d ago",
      icon: <Folder className="h-4 w-4 text-[#C27AFF]" />
    },
  ]

  const activityFeed = [
    { 
      name: "Sarah Chen", 
      action: "approved Invena - Creative Agency", 
      time: "10 minutes ago",
      avatar: "SC"
    },
    { 
      name: "Samuel Chen", 
      action: "added comments to Redox - Design Agency", 
      time: "2h ago",
      avatar: "SC"
    },
    { 
      name: "Mike Johnson", 
      action: "uploaded new version Redox - Parallax Carousel", 
      time: "4h ago",
      avatar: "MJ"
    },
    { 
      name: "Lisa Wang", 
      action: "shared project Redox - IT Solutions", 
      time: "1d ago",
      avatar: "LW"
    },
  ]

  return (
    <div>
      <Sidebar>
        <section className="xl:px-2 xl:pb-24">

          {/* Header */}
          <div>
            <p className="text-xl mb-1.5 font-semibold">Dashboard</p>
            <p className="text-sm text-[#A1A1A1]">
              Your collaboration hub for feedback and design reviews
            </p>
          </div>

          {/* Hero Section */}
          <div className="mt-10 flex bg-[#0C0B0F] p-12 rounded-2xl border border-[#2E2E2E]">
            <div className="xl:w-[60%]">
              <div className="flex flex-col gap-5">
                <p className="text-[#A1A1A1] flex items-center gap-1">
                  <Users className="h-4.5 w-4.5" /> Trusted by 10,000+ teams
                </p>
                <p className="text-2xl xl:text-4xl font-semibold">
                  Click. Comment. <br /> Collaborate.
                </p>
                <p className="mb-5 text-[#A1A1A1]">
                  Leave feedback directly on any website or design. No more confusing revision rounds.
                </p>
              </div>

              <div className="flex gap-5 mb-5 text-sm">
                <p>90% faster feedback <br /> loops</p>
                <p>Zero design handoff <br /> confusion</p>
              </div>

              <div className="flex gap-5">
                <button className="bg-[#6A49FC] px-3 py-2 text-sm font-semibold rounded-xl flex items-center gap-2">
                  <CirclePlay className="h-4.5 w-4.5" /> 
                  See Live Demo 
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
                <button className="bg-[#121114] px-3 py-2 text-sm font-semibold rounded-xl flex items-center gap-2 border border-[#314158]">
                  <Link className="h-4.5 w-4.5" /> Start Your Project
                </button>
              </div>
            </div>

            <div>
              {/* Replace with actual image */}
              image
            </div>
          </div>

          {/* Get Started Section */}
          <div className="flex justify-center flex-col items-center mt-12">
            <p className="text-[1.3em] font-semibold">Get Started in Seconds</p>
            <p className="text-[#A1A1A1] text-sm">
              Choose how you'd like to begin collaborating on your designs
            </p>

            <div className="flex gap-5 mt-10">
              {/* Import from URL card */}
              <div className="bg-[#0E0D16] py-7 px-8 flex items-center gap-5 rounded-2xl border border-[#2A205C]">
                <div className="bg-[#211A44] p-3 rounded-full">
                  <Link className="h-6 w-6 text-[#C27AFF]" />
                </div>
                <div>
                  <p className="font-semibold">Import from URL</p>
                  <p className="text-sm text-[#A1A1A1]">
                    Paste any website, Figma file, or prototype link to start reviewing
                  </p>
                </div>
                <ChevronRight className="h-8 w-8 text-[#A1A1A1]" />
              </div>

              {/* Upload Files card */}
              <div className="bg-[#0B0F16] py-7 px-8 flex items-center gap-5 rounded-2xl border border-[#142A78]">
                <div className="bg-[#132646] p-3 rounded-full">
                  <Upload className="h-6 w-6 text-[#51A2FF]" />
                </div>
                <div>
                  <p className="font-semibold">Upload Files</p>
                  <p className="text-sm text-[#A1A1A1]">
                    Drop PDFs, images, or documents for instant review and feedback
                  </p>
                </div>
                <ChevronRight className="h-8 w-8 text-[#A1A1A1]" />
              </div>
            </div>
          </div>

          {/* Why Teams Choose Section */}
          <div className="flex justify-center flex-col items-center mt-14">
            <p className="text-white font-semibold text-[1.3em]">Why Teams Choose Jottyme</p>
            <p className="text-sm text-[#A1A1A1]">
              Built for modern design teams who demand efficiency and clarity
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {whyTeamsChoose.map((card, index) => (
                <div 
                  key={index} 
                  className="bg-[#171717] p-6 rounded-2xl border border-[#2E2E2E] flex flex-col items-start"
                >
                  <div className="p-3 rounded-full">{card.icon}</div>
                  <p className="font-semibold mb-3">{card.title}</p>
                  <p className="text-sm text-[#A1A1A1] mb-3">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects & Activity Feed */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-12">
            
            {/* Recent Projects Card (10% taller) */}
            <div className="bg-[#0C0B0F] p-6 rounded-2xl border border-[#2E2E2E] h-[120%]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-[#6A49FC]" />
                  <p className="font-semibold">Recent Projects</p>
                </div>
                <button className="text-sm text-[#6A49FC] hover:underline">View all</button>
              </div>
              <div className="flex flex-col gap-4">
                {recentProjects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-[#2E2E2E] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      {project.icon}
                      <p className="text-sm">{project.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-[#A1A1A1]" />
                      <p className="text-xs text-[#A1A1A1]">{project.updated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed Card */}
            <div className="bg-[#0C0B0F] p-6 rounded-2xl border border-[#2E2E2E] h-full">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#00D492]" />
                  <p className="font-semibold">Activity Feed</p>
                </div>
                <button className="text-sm text-[#6A49FC] hover:underline">View all</button>
              </div>
              <div className="flex flex-col gap-4">
                {activityFeed.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 border-b border-[#2E2E2E] pb-3 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6A49FC] to-[#51A2FF] flex items-center justify-center text-xs font-semibold text-white">
                      {activity.avatar}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm">
                        <span className="font-semibold">{activity.name}</span> {activity.action}
                      </p>
                      <p className="text-xs text-[#A1A1A1]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>
      </Sidebar>
    </div>
  )
}

export default Page