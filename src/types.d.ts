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