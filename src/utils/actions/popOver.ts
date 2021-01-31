import { escape } from 'html-escaper';
import type { ValuesType } from 'utility-types';

import { memoize } from '@/utils/memoize';

const positions = ['top', 'right', 'bottom', 'left'] as const;

export interface PopOverParams {
  readonly position: ValuesType<typeof positions>;
  readonly text: string;
}

export function popOver(
  nodeElement: HTMLElement,
  params?: Partial<PopOverParams>,
) {
  const escapeText = memoize(escape);

  function applyPopOver(appliedParams?: Partial<PopOverParams>) {
    const text = appliedParams?.text ?? '';
    const position = appliedParams?.position ?? 'right';

    for (const pos of positions) {
      if (position === pos) {
        nodeElement.setAttribute(`popover-${pos}`, escapeText(text));
      } else {
        nodeElement.removeAttribute(`popover-${pos}`);
      }
    }
  }

  function destroy() {
    for (const pos of positions) {
      nodeElement.removeAttribute(`popover-${pos}`);
    }
  }

  applyPopOver(params);

  return {
    update: applyPopOver,
    destroy,
  };
}
