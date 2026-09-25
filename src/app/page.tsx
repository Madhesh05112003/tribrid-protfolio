import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Concept } from "@/components/Concept";
import { BuildLog } from "@/components/BuildLog";
import { ModeSwitcher } from "@/components/ModeSwitcher";
import { TripleCharge } from "@/components/TripleCharge";
import { IotBrain } from "@/components/IotBrain";
import { RoadTest } from "@/components/RoadTest";
import { Impact } from "@/components/Impact";
import { Gallery } from "@/components/Gallery";
import { Credits } from "@/components/Credits";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <Problem />
      <Concept />
      <BuildLog />
      <ModeSwitcher />
      <TripleCharge />
      <IotBrain />
      <RoadTest />
      <Impact />
      <Gallery />
      <Credits />
    </main>
  );
}
