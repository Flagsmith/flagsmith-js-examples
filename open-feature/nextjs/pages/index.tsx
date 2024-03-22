import type { NextPage } from 'next';
import { useFlags } from 'flagsmith-es/react';
import Link from "next/link";
import {useNumberFlagValue} from "@openfeature/react-sdk";

const Home: NextPage = () => {
  const font_size = useNumberFlagValue("font_size", 12) // only causes re-render if specified flag values / traits change
  return (
      <div className="App">
          font_size: {font_size}
        <Link href="/flagsmith_sample_user">
            Login
        </Link>
      </div>
  );
}

export default Home
