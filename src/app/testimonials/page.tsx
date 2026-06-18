import Testimonials from "@/components/Testimonials";
import GotAnIdea from "@/components/GotAnIdea";

export const metadata = { title: "Testimonials | Anurag Patwardhan" };

export default function Page() {
  return (
    <>
      <div className="pt-28 bg-black" />
      <Testimonials />
      <GotAnIdea />
    </>
  );
}
