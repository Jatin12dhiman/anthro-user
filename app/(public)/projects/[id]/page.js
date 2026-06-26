import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects-data";
import ProjectDetailClient from "@/components/project-detail-client";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found — Anthroplanet" };
  return {
    title: `${project.title} | Research Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
