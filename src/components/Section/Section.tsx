import { Heading } from "@/components/Typography/Heading";
interface Props {
    children:React.ReactNode,
    heading?:string
}
function Section({children,heading}:Props) {
  return (
    <section className="flex flex-col p-2 sm:p-4 gap-6 items-center m-auto">
      {heading && <Heading text={heading} />}
      <section>
        {children}
      </section>
    </section>
  );
}

export default Section;
