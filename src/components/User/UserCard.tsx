interface Props {
    data:UserData
}

export default function UserCard({data}:Props){
    return <strong>Nombre: {data.name}</strong>
}