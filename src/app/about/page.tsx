import Intro from "@/components/Intro";
import About from "@/components/About";
import Experience from "@/components/Experience";

export const metadata = { title: "About | Anurag Patwardhan" };

export default function Page() {
  return (
    <>
      <div className="pt-20 bg-black" />
      <Intro />
      <About />
      <Experience />
    </>
  );
}
