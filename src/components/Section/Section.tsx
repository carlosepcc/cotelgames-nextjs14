import { Heading } from "@/components/Typography/Heading";
interface Props {
    children:React.ReactNode,
    heading?:string
}
function Section({children,heading}:Props) {
  return (
    <section className="flex flex-col p-2 py-4 sm:p-4 gap-6 items-center m-auto h-full">
      {heading && <Heading text={heading} />}
      {children}
    </section>
  );
}

export default Section;
