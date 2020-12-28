export interface PinParams {
  active: boolean;
  zIndex?: number;
}

export function pin(node: HTMLElement, params: PinParams) {
  function applyPin({ active, zIndex = 20 }: PinParams) {
    if (active) {
      const { top, left, width } = node.getBoundingClientRect();
      const { marginTop } = window.getComputedStyle(node);

      node.style.top = `${top - parseInt(marginTop, 10) ?? 0}px`;
      node.style.left = `${left}px`;
      node.style.width = `${width}px`;
      node.style.zIndex = `${zIndex}`;
      node.style.position = 'fixed';
    } else {
      node.style.removeProperty('position');
      node.style.removeProperty('z-index');
      node.style.removeProperty('top');
      node.style.removeProperty('left');
      node.style.removeProperty('width');
    }
  }

  applyPin(params);

  return {
    update: applyPin,
  };
}
