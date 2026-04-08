import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RoofConfigurator } from "@/components/RoofConfigurator";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Header />
      <RoofConfigurator />
      <Footer />
    </main>
  );
}
