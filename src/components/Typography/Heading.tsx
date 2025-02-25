
interface HeadingProps{
    text?:string;
    children?:React.ReactNode;
}
const Heading = ({text,children}:HeadingProps) => <h2 className="text-3xl font-bold">{children??text}</h2>


export {Heading}