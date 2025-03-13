import Section from "@/components/Section/Section";
import { Heading } from "@/components/Typography/Heading";
import Link from "next/link";
import { games } from "@/stores/gamesStore";

function GamesPage() {
  return (
    <Section heading="Games">
      <div className="flex flex-col gap-4 justify-center h-full">
        {games.map((game) => (
          <Link href={"games/" + game.code} key={game.code}>
            <div className="p-8 text-xl bg-white border shadow font-bold rounded-xl hover:bg-gray-50 active:scale-95 transition-all">{game.title}</div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export default GamesPage;
