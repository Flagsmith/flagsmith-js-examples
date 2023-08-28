import type { NextPage } from 'next';
import { useFlags } from 'flagsmith-es/react';
import Link from "next/link";

const Home: NextPage = () => {
  const flags = useFlags(["font_size"]) // only causes re-render if specified flag values / traits change
    console.log("Rendering", flags.font_size.value)
  return (
      <div className="App">
        {
          JSON.stringify(flags)
        }
        <Link href="/">
            Home
        </Link>
      </div>
  );
}

export default Home
