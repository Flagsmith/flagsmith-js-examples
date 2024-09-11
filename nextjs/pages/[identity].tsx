import type { NextPage } from 'next';
import {useFlags, useFlagsmith} from 'flagsmith-es/react';
import Link from "next/link";

const Home: NextPage = () => {
  const flags = useFlags(["font_size"]) // only causes re-render if specified flag values / traits change
    console.log("Rendering", flags.font_size.value)
    const flagsmith = useFlagsmith()

  return (
      <div className="App">
        {
          JSON.stringify(flags)
        }
        <button onClick={()=>{
            flagsmith.setContext({
                identity: {
                    traits: {
                        a: 1,
                        b: 2,
                    }
                }
            })
        }}>Trait</button>
        <Link href="/">
            Home
        </Link>
      </div>
  );
}

export default Home
