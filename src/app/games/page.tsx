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
            <div className="p-8 text-xl bg-primary border-b-4 border-primary-dark font-bold rounded-xl">{game.title}</div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export default GamesPage;
