import Section from "@/components/Section/Section";
import { Heading } from "@/components/Typography/Heading";
import Link from "next/link";
import { games } from "@/stores/gamesStore";

function GamesPage() {
  return (
    <Section heading="Games">
      <div className="flex flex-col">
        {games.map((game) => (
          <Link href={"games/" + game.code}>
            <div>{game.title}</div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export default GamesPage;
