import Image from 'next/image';
import { GanttExample } from '../components/gantt';

import { CopyIcon } from 'lucide-react';
import EververseLogo from './eververse.png';
import GanttLogo from './gantt.svg';
import GithubLogo from './github.svg';
import ReactLogo from './react.svg';

export default function HomePage() {
  return (
    <>
      <section className="container mx-auto max-w-5xl flex flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Composable{' '}
          <Image
            src={ReactLogo}
            alt=""
            width={48}
            height={48}
            className="inline-block align-baseline"
          />{' '}
          React components for building interactive{' '}
          <Image
            src={GanttLogo}
            alt=""
            width={48}
            height={48}
            className="inline-block align-baseline -rotate-6 ml-2 translate-y-1"
          />{' '}
          roadmaps.
        </h1>
        <p className="mt-6 max-w-lg text-center text-lg text-muted-foreground sm:text-xl text-pretty">
          A collection of accessible, customizable, performant and open source
          components built for{' '}
          <a href="https://www.eververse.ai" target="_blank" rel="noreferrer">
            <Image
              src={EververseLogo}
              alt=""
              width={16}
              height={16}
              className="inline-block align-baseline"
            />{' '}
            Eververse.
          </a>
        </p>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <div className="text-muted-foreground pr-1">
              <span className="text-foreground">pnpm</span> add roadmap-ui
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative z-10 h-6 w-6 hover:bg-zinc-700 hover:text-zinc-50"
              type="button"
              id="radix-:Rj3ffadta:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <CopyIcon size={16} className="text-muted-foreground" />
              <span className="sr-only">Copy</span>
            </button>
          </div>
          <a
            target="_blank"
            rel="noreferrer"
            className="relative !py-0 group inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            href="https://github.com/haydenbleasel/roadmap-ui"
          >
            <div className="flex items-center h-full gap-2">
              <Image src={GithubLogo} alt="Github" width={16} height={16} />
              <div className="hidden md:[display:unset]">GitHub</div>
              <div className="hidden md:[display:unset] h-full w-px bg-input group-hover:bg-foreground mx-2" />
              <div>2.4K</div>
            </div>
          </a>
        </div>
      </section>
      <section className="container mx-auto">
        <div className="mt-8 flex flex-col overflow-clip h-[500px] w-full bg-white rounded-xl border">
          <GanttExample />
        </div>
      </section>
    </>
  );
}
