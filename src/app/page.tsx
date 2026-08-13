import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Highlights from "@/components/Highlights";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import CoreCompetencies from "@/components/CoreCompetencies";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Testimonials from "@/components/Testimonials";
import Awards from "@/components/Awards";
import GotAnIdea from "@/components/GotAnIdea";
import StudioPortal from "@/components/StudioPortal";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Highlights />
      <About />
      <Projects />
      <Skills />
      <CoreCompetencies />
      <Experience />
      <Education />
      <Testimonials />
      <Awards />
      <GotAnIdea />
      <StudioPortal />
    </>
  );
}
