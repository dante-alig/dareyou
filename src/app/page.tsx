"use client";

import ButtonSkip from "@/components/introduction/buttonSkip";
import MainText from "@/components/introduction/mainText";
import TopImages from "@/components/introduction/topImages";
import BottomImages from "@/components/introduction/bottomImages";

export default function Introduction() {
  return (
    <main className="min-h-screen bg-yellow-400 flex flex-col items-center justify-between p-4 relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center w-full relative">
        <div>
          <TopImages />
          <MainText />
          <BottomImages />
        </div>

        <ButtonSkip text="Passer" href="/player" />
      </div>
    </main>
  );
}
