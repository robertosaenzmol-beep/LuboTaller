import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Q = (sel: string) => Element[];

const draw = (targets: gsap.TweenTarget, at: number, tl: gsap.core.Timeline, dur = 0.4, stagger = 0.015) =>
  tl.to(targets, { strokeDashoffset: 0, duration: dur, stagger, ease: 'none' }, at);

const show = (targets: gsap.TweenTarget, at: number, tl: gsap.core.Timeline, dur = 0.15) =>
  tl.to(targets, { opacity: 1, duration: dur, ease: 'none' }, at);

const hide = (targets: gsap.TweenTarget, at: number, tl: gsap.core.Timeline, dur = 0.15) =>
  tl.to(targets, { opacity: 0, duration: dur, ease: 'none' }, at);

/** Act 1: car → diagnosis → worn pad. Each step owns one unit of time. */
function buildAct1(svg: SVGSVGElement, q: Q) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.inOut' } });
  const car = q('.sc-car')[0];
  const diag = q('.sc-diag')[0];
  const brake = q('.sc-brake')[0];

  // Step 1 — car draws itself in
  show([car, q('.tb-0')], 0, tl, 0.05);
  draw(car.querySelectorAll('.draw'), 0, tl, 0.45, 0.012);
  show(car.querySelector('.callout'), 0.5, tl, 0.15);

  // Step 2 — zoom into detail A, then diagnosis
  tl.to(car, { scale: 2.6, opacity: 0, svgOrigin: '230 432', duration: 0.3 }, 1.0);
  hide(q('.tb-0'), 1.0, tl, 0.1);
  show([diag, q('.tb-1')], 1.15, tl, 0.05);
  draw(diag.querySelectorAll('.draw'), 1.15, tl, 0.4, 0.02);
  show(diag.querySelector('.pins'), 1.35, tl, 0.15);

  // Step 3 — brake draws, explodes, pad section with the "3 mm"
  hide([diag, q('.tb-1')], 2.0, tl, 0.12);
  show([brake, q('.tb-2')], 2.05, tl, 0.05);
  draw(brake.querySelectorAll('.draw'), 2.05, tl, 0.3, 0.004);
  tl.to(brake.querySelector('.b-caliper'), { x: 120, y: -60, opacity: 0, duration: 0.2 }, 2.38);
  tl.to(brake.querySelector('.b-pad'), { x: 200, y: -40, duration: 0.22 }, 2.42);
  show(brake.querySelector('.labels-explode'), 2.55, tl, 0.1);
  show(brake.querySelector('.xsection'), 2.62, tl, 0.15);
  tl.set({}, {}, 3); // pad the timeline so it spans all three steps
  return tl;
}

/** Act 2: parts list → what stays → keys back. */
function buildAct2(svg: SVGSVGElement, q: Q) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.inOut' } });
  const brake = q('.sc-brake2')[0];
  const table = q('.sc-table')[0];
  const key = q('.sc-key')[0];

  // Starting state: brake already exploded, drawn (carried over from act 1).
  gsap.set(brake.querySelectorAll('.draw'), { strokeDashoffset: 0 });
  gsap.set(brake.querySelector('.b-caliper'), { x: 120, y: -60, opacity: 0 });
  gsap.set(brake.querySelector('.b-pad'), { x: 200, y: -40 });
  gsap.set(brake.querySelector('.b-pad-new'), { x: 330, y: -40, opacity: 0 });
  gsap.set(brake, { opacity: 1 });

  // Step 4 — parts list
  show([table, q('.tb-0')], 0, tl, 0.2);
  show(brake.querySelector('.balloons'), 0.2, tl, 0.15);

  // Step 5 — old pads out, new pads in; disc measured, stays
  tl.to(brake.querySelector('.b-pad'), { x: 330, opacity: 0, duration: 0.2 }, 1.0);
  tl.to(brake.querySelector('.b-pad-new'), { x: 200, opacity: 1, duration: 0.22 }, 1.12);
  hide(q('.tb-0'), 1.0, tl, 0.1);
  show(q('.tb-1'), 1.05, tl, 0.1);
  hide(brake.querySelector('.balloons'), 1.0, tl, 0.1);
  show(brake.querySelector('.measure'), 1.2, tl, 0.15);
  hide(table.querySelector('.st-before'), 1.3, tl, 0.08);
  show(table.querySelector('.st-after'), 1.36, tl, 0.1);

  // Step 6 — reassemble, keys back
  hide([table, brake.querySelector('.measure'), q('.tb-1')], 2.0, tl, 0.12);
  tl.to(brake.querySelector('.b-pad-new'), { x: 0, y: 0, duration: 0.2 }, 2.05);
  tl.to(brake.querySelector('.b-caliper'), { x: 0, y: 0, opacity: 1, duration: 0.2 }, 2.15);
  tl.to(brake.querySelector('.brake-scale'), { scale: 0.74, x: -50, svgOrigin: '290 330', duration: 0.25 }, 2.3);
  show([key, q('.tb-2')], 2.35, tl, 0.05);
  draw(key.querySelectorAll('.draw'), 2.35, tl, 0.3, 0.02);
  show(key.querySelector('.key-tag'), 2.6, tl, 0.12);
  tl.set({}, {}, 3);
  return tl;
}

export function initStory() {
  const root = document.querySelector<HTMLElement>('#nosotros');
  if (!root) return;

  const railLinks = new Map<string, HTMLAnchorElement>();
  root.querySelectorAll<HTMLAnchorElement>('[data-rail]').forEach((a) => railLinks.set(a.dataset.rail!, a));
  const bar = root.querySelector<HTMLElement>('.progress span');

  // Progress bar tracks the whole section; the rail only shows beside the drawings.
  ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => { if (bar) bar.style.transform = `scaleX(${self.progress})`; },
  });
  root.querySelectorAll<HTMLElement>('[data-story]').forEach((story) => {
    ScrollTrigger.create({
      trigger: story,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => story.classList.toggle('on', self.isActive),
      onRefresh: () => {},
    });
  });
  const syncRail = () => root.classList.toggle('in-view', !!root.querySelector('[data-story].on'));
  ScrollTrigger.addEventListener('scrollEnd', syncRail);
  window.addEventListener('scroll', syncRail, { passive: true });

  const mm = gsap.matchMedia();

  root.querySelectorAll<HTMLElement>('[data-story]').forEach((story) => {
    const svg = story.querySelector<SVGSVGElement>('svg.lamina')!;
    const q: Q = (sel) => Array.from(svg.querySelectorAll(sel));
    const act = story.dataset.story;
    const steps = Array.from(story.querySelectorAll<HTMLElement>('[data-step]'));

    // Active card + rail state, shared by both motion modes
    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          step.classList.toggle('is-active', self.isActive);
          railLinks.get(step.id)?.classList.toggle('is-active', self.isActive);
          if (self.isActive) railLinks.get(step.id)?.setAttribute('aria-current', 'step');
          else railLinks.get(step.id)?.removeAttribute('aria-current');
        },
      });
    });

    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' },
      (ctx) => {
        const tl = act === '1' ? buildAct1(svg, q) : buildAct2(svg, q);
        const { reduce } = ctx.conditions as { reduce: boolean };

        if (!reduce) {
          // Scrub: each card drives one unit of the drawing.
          ScrollTrigger.create({
            trigger: story.querySelector('.story-steps'),
            start: () => (window.innerWidth < 900 ? 'top 100%' : 'top 75%'),
            end: () => (window.innerWidth < 900 ? 'bottom 100%' : 'bottom 75%'),
            invalidateOnRefresh: true,
            scrub: 0.6,
            animation: tl,
          });
        } else {
          // Reduced motion: jump between finished drawings, no tweening.
          steps.forEach((step, i) => {
            ScrollTrigger.create({
              trigger: step,
              start: 'top 70%',
              end: 'bottom 70%',
              onToggle: (self) => { if (self.isActive) tl.progress(Math.min((i + 0.9) / steps.length, 1)); },
            });
          });
          tl.progress(0.9 / steps.length);
        }
        return () => tl.revert();
      },
    );
  });
}
