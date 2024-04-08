import type { NextPage } from 'next';
import { useFlags } from 'flagsmith-es/react';
import Link from "next/link";

const Home: NextPage = () => {
  const flags = useFlags(["font_size"]) // only causes re-render if specified flag values / traits change
  return (
      <div className="App">
        {
          JSON.stringify(flags)
        }
        <Link href="/flagsmith_sample_user">
            Login
        </Link>
      </div>
  );
}

export default Home
