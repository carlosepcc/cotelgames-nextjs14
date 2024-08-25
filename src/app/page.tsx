import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24">
      Welcome
      <Link href='games'>Go to Games Gallery</Link>
    </section>
  )
}
