import UserCard from "@/components/User/UserCard";
export default function List() {
  const user: UserData = { name: "John", email: "user@mail.com", id: "0" };
  return (
    <section>
      <h2>Listado</h2>
      <UserCard data={user} />
    </section>
  );
}
