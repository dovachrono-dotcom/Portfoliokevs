type Options = { reduced: boolean; mobile: boolean; fine: boolean };
type Classes = { pixel: string; runner: string };

const CELL = 28;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const random = (min: number, max: number) => min + Math.random() * (max - min);

export function createSiteBackgroundMotion(root: HTMLElement, content: HTMLElement, classes: Classes, options: Options) {
  const host = root.querySelector<HTMLElement>("[data-background-pixels]")!;
  const cursorHost = root.querySelector<HTMLElement>("[data-cursor-pixels]")!;
  const spot = root.querySelector<HTMLElement>("[data-background-spotlight]")!;
  const staticPixels = [...root.querySelectorAll<HTMLElement>("[data-static-pixels] > span")];
  const timeouts = new Set<number>();
  const intervals = new Set<number>();
  const animations = new Set<Animation>();
  const trails: HTMLElement[] = [];
  let running = false;
  let inView = false;
  let disposed = false;
  let pointerFrame = 0;
  let x = 0, y = 0, targetX = 0, targetY = 0, lastColumn = -1, lastRow = -1;
  root.dataset.motion = options.reduced ? "reduced" : "full";

  function grid() {
    return { columns: Math.max(1, Math.floor(root.clientWidth / CELL)), rows: Math.max(1, Math.floor(root.clientHeight / CELL)) };
  }
  function placeStatic() {
    const g = grid();
    const positions = [[.35,.12],[.5,.28],[.65,.18],[.8,.48],[.45,.58],[.9,.75]];
    staticPixels.forEach((pixel, index) => {
      pixel.style.left = `${Math.min(g.columns - 1, Math.floor(g.columns * positions[index][0])) * CELL}px`;
      pixel.style.top = `${Math.min(g.rows - 1, Math.floor(g.rows * positions[index][1])) * CELL}px`;
    });
  }
  function later(callback: () => void, delay: number) {
    const id = window.setTimeout(() => { timeouts.delete(id); if (running && !disposed) callback(); }, delay);
    timeouts.add(id);
  }
  function pixel(runner = false, cursor = false) {
    const element = document.createElement("span");
    element.className = `${classes.pixel}${runner ? ` ${classes.runner}` : ""}`;
    element.setAttribute("aria-hidden", "true");
    element.dataset.themeMotion = "";
    (cursor ? cursorHost : host).appendChild(element);
    return element;
  }
  function track(animation: Animation, finish: () => void) {
    animations.add(animation);
    animation.onfinish = () => {
      animations.delete(animation);
      if (running && !disposed) finish();
      animation.cancel();
    };
  }
  function trail(column: number, row: number, opacity: number, duration: number, cursor = false) {
    const element = pixel(false, cursor);
    element.style.left = `${column * CELL}px`;
    element.style.top = `${row * CELL}px`;
    trails.push(element);
    if (trails.length > 90) {
      const old = trails.shift()!;
      for (const animation of old.getAnimations()) { animations.delete(animation); animation.cancel(); }
      old.remove();
    }
    track(element.animate([{ opacity }, { opacity: 0 }], { duration, easing: "ease-out" }), () => {
      element.remove();
      const index = trails.indexOf(element);
      if (index >= 0) trails.splice(index, 1);
    });
  }
  function pop(element: HTMLElement) {
    const g = grid();
    element.style.left = `${Math.min(g.columns - 1, Math.floor(g.columns * random(.3, 1))) * CELL}px`;
    element.style.top = `${Math.min(g.rows - 1, Math.floor(g.rows * random(.04, .92))) * CELL}px`;
    element.style.willChange = "transform, opacity";
    track(element.animate([
      { opacity: 0, transform: "scale(.2)" },
      { opacity: .75, transform: "scale(1.25)", offset: .14 },
      { opacity: .55, transform: "scale(1)", offset: .28 },
      { opacity: .55, transform: "scale(1)", offset: .72 },
      { opacity: 0, transform: "scale(.5)" },
    ], { duration: random(1800, 3600), easing: "ease-out" }), () => {
      element.style.removeProperty("will-change");
      later(() => pop(element), random(80, 700));
    });
  }
  function runner(index: number) {
    const element = pixel(true);
    const g = grid();
    let column = Math.floor(g.columns * random(.4, .9));
    let row = Math.floor(g.rows * random(.1, .8));
    let dx = 1, dy = 0;
    const place = () => { element.style.transform = `translate3d(${column * CELL}px,${row * CELL}px,0)`; };
    place();
    track(element.animate([{ opacity: 0 }, { opacity: .95 }], { duration: 500, fill: "forwards" }), () => { element.style.opacity = ".95"; });
    intervals.add(window.setInterval(() => {
      if (!running || document.hidden) return;
      const current = grid();
      if (Math.random() < .35) [dx, dy] = [[1,0],[-1,0],[0,1],[0,-1]][Math.floor(Math.random() * 4)];
      let nextColumn = column + dx, nextRow = row + dy;
      if (nextColumn < Math.min(2, current.columns - 1) || nextColumn >= current.columns || nextRow < Math.min(1, current.rows - 1) || nextRow >= current.rows) {
        dx = -dx; dy = -dy; nextColumn = column + dx; nextRow = row + dy;
      }
      trail(clamp(column, 0, current.columns - 1), clamp(row, 0, current.rows - 1), .45, 1000);
      column = clamp(nextColumn, 0, current.columns - 1);
      row = clamp(nextRow, 0, current.rows - 1);
      place();
    }, 380 + index * 60));
  }
  function followPointer() {
    pointerFrame = 0;
    if (!running) return;
    x += (targetX - x) * .12; y += (targetY - y) * .12;
    spot.style.transform = `translate3d(${x}px,${y}px,0)`;
    if (Math.abs(targetX - x) > .5 || Math.abs(targetY - y) > .5) pointerFrame = requestAnimationFrame(followPointer);
  }
  function pointerMove(event: PointerEvent) {
    if (!running || !options.fine || options.mobile) return;
    if (event.pointerType === "touch" || !(event.target instanceof Node) || !content.contains(event.target)) { pointerLeave(); return; }
    const rect = root.getBoundingClientRect();
    targetX = event.clientX - rect.left; targetY = event.clientY - rect.top;
    root.dataset.pointerActive = "true";
    if (!pointerFrame) pointerFrame = requestAnimationFrame(followPointer);
    const column = Math.floor(targetX / CELL), row = Math.floor(targetY / CELL);
    const g = grid();
    if (column >= 0 && column < g.columns && row >= 0 && row < g.rows && (column !== lastColumn || row !== lastRow)) {
      lastColumn = column; lastRow = row; trail(column, row, .55, 900, true);
    }
  }
  function pointerLeave() {
    root.dataset.pointerActive = "false";
    cancelAnimationFrame(pointerFrame); pointerFrame = 0;
    lastColumn = -1; lastRow = -1;
  }
  function stop() {
    running = false;
    root.dataset.running = "false";
    pointerLeave();
    for (const id of timeouts) window.clearTimeout(id);
    for (const id of intervals) window.clearInterval(id);
    timeouts.clear(); intervals.clear();
    for (const animation of animations) { animation.onfinish = null; animation.cancel(); }
    animations.clear(); trails.length = 0; host.replaceChildren(); cursorHost.replaceChildren();
  }
  function reconcile() {
    const shouldRun = inView && !document.hidden && !options.reduced && typeof Element.prototype.animate === "function";
    if (shouldRun === running || disposed) return;
    if (!shouldRun) { stop(); return; }
    running = true;
    root.dataset.running = "true";
    for (let index = 0; index < (options.mobile ? 7 : 16); index++) later(() => pop(pixel()), index * 160);
    for (let index = 0; index < 3; index++) runner(index);
  }
  const observer = typeof IntersectionObserver === "undefined" ? undefined : new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; reconcile(); });
  placeStatic();
  observer?.observe(content);
  if (!observer) { inView = true; reconcile(); }
  document.addEventListener("pointermove", pointerMove, { passive: true });
  document.addEventListener("pointerleave", pointerLeave);
  window.addEventListener("scroll", pointerLeave, { passive: true });
  window.addEventListener("resize", placeStatic, { passive: true });
  document.addEventListener("visibilitychange", reconcile);
  return () => {
    disposed = true;
    stop(); observer?.disconnect();
    document.removeEventListener("pointermove", pointerMove);
    document.removeEventListener("pointerleave", pointerLeave);
    window.removeEventListener("scroll", pointerLeave);
    window.removeEventListener("resize", placeStatic);
    document.removeEventListener("visibilitychange", reconcile);
  };
}
