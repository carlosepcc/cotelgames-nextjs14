interface UserData{
    id:string;
    name:string;
    email:string;
}
type LocString = { [key: string]: string };
type GameInfo = {
  title: LocString;
  description: LocString;
};



interface Card {
  value: number;
  label?: string;
  suit: Suit["id"];
}
interface Suit {
  id: number;
  name: string;
  color?: string;
  symbol?: string;
  img?: string;
}
interface CardType {
  name: string;
  suits: Suit[];
}