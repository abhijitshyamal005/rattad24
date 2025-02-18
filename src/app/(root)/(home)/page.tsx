import { createEarlyAccessTable } from "@/app/actions";
import Benefits from "./components/Benefits";
import EarlyAccessForm from "./components/EarlyAccessForm";
import Features from "./components/Features";
import Hero from "./components/Hero";
import Simplexwork from "./components/How-simplex-work";
import TestimonialSection from "./components/Testimonial";
import VideoPlayer from "./components/video";

export default async function Home() {
  const initTables = await createEarlyAccessTable();
  return (
    <div className="bg-black">
      <Hero />
      <VideoPlayer />
      <Features />
      <Benefits />
      <Simplexwork />
      <TestimonialSection />
      <EarlyAccessForm />
    </div>
  );
}
