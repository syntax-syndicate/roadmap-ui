import { SquareChartGanttIcon } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';

export const Logo: FC = () => (
  <div className="flex items-center gap-2">
    <Image
      src="/logo.png"
      alt="Roadmap UI"
      width={24}
      height={24}
      className="dark:hidden"
    />
    <SquareChartGanttIcon className="hidden h-4 w-4 dark:block" />
    <span className="font-semibold">Roadmap UI</span>
  </div>
);
