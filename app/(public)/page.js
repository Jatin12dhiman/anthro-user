import HomeHero from "@/components/home-hero";
import HomeModules from "@/components/home-modules";
import HomeHowItWorks from "@/components/home-how-it-works";
import HomeBlogs from "@/components/home-blogs";
import HomeTestimonials from "@/components/home-testimonials";
import HomeCta from "@/components/home-cta";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeModules />
      <HomeHowItWorks />
      <HomeBlogs />
      <HomeTestimonials />
      <HomeCta />
    </>
  );
}
