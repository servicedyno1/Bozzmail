import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ReserveForm } from "./ReserveForm";

const ON = "Turn ON Privacy";
const OFF = "Turn OFF Surveillance";
const GLYPHS = "$#%&@!?*01<>/";

const useReservationCount = () => {
  const [count, setCount] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/reservations/count`).then((r) => setCount(r.data.count)).catch(() => {});
  }, []);
  return count;
};

const useScramble = (target) => {
  const [text, setText] = useState(target);
  useEffect(() => {
    let frame = 0;
    const total = 14;
    const id = setInterval(() => {
      frame += 1;
      const reveal = Math.floor((frame / total) * target.length);
      setText(
        target
          .split("")
          .map((c, i) => (c === " " || i < reveal ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (frame >= total) {
        setText(target);
        clearInterval(id);
      }
    }, 38);
    return () => clearInterval(id);
  }, [target]);
  return text;
};

export const Hero = () => {
  const wrap = useRef(null);
  const [off, setOff] = useState(false);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  const bg = useTransform(scrollYProgress, [0.22, 0.55], ["#d93951", "#410002"]);
  const onOpacity = useTransform(scrollYProgress, [0.3, 0.42], [1, 0]);
  const offOpacity = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
  const fingerY = useTransform(scrollYProgress, [0.2, 0.45], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1.12]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setOff(v > 0.38));
  const title = useScramble(off ? OFF : ON);
  const count = useReservationCount();

  return (
    <div ref={wrap} id="top" className="relative h-[calc(800px+120vh)] md:h-[calc(900px+120vh)]" data-testid="hero-wrap">
      <motion.section
        style={{ backgroundColor: bg }}
        className="sticky top-0 flex h-[max(100svh,720px)] w-full flex-col items-center overflow-hidden px-4 pt-[14vh] text-center md:pt-[17vh]"
        data-testid="hero-section"
        data-state={off ? "off" : "on"}
      >
        <h1
          className="font-mono-display mb-2 text-[min(11vw,4.5rem)] font-semibold leading-[1.1] text-peach md:text-[min(7vw,100px)]"
          data-testid="hero-title"
        >
          {title}
        </h1>
        <p className="max-w-2xl text-base text-peach md:text-[length:var(--text-m)]" data-testid="hero-subtitle">
          Encrypted email, calendar and contacts — yours forever.
        </p>
        <p className="mb-6 max-w-2xl text-sm text-peach/85 md:mb-8 md:text-base" data-testid="hero-offer">
          Reserve your @bozzmail.com address before launch.
        </p>

        <div id="reserve" className="flex w-full justify-center scroll-mt-32">
          <ReserveForm idPrefix="hero-reserve" variant={off ? "fighter" : "yellow"} />
        </div>

        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-peach/90 md:text-sm" data-testid="hero-proof">
          <span data-testid="hero-counter">
            {count === null ? "" : count >= 50 ? `${count.toLocaleString()} addresses already reserved` : "Be among the first to reserve"}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>Free</span>
          <span aria-hidden="true">·</span>
          <span>No card needed</span>
          <span aria-hidden="true">·</span>
          <span>Takes 30 seconds</span>
        </p>

        <motion.div
          style={{ scale }}
          className="relative -mt-2 w-[300px] origin-top md:mt-0 md:w-[340px]"
          data-testid="hero-switch"
        >
          <div className="relative aspect-[848/923] w-full">
            <motion.img
              src="/illustrations/switch-on.webp"
              alt="Illustrated light switch turned on"
              style={{ opacity: onOpacity }}
              className="absolute inset-0 h-full w-full select-none"
              draggable="false"
            />
            <motion.img
              src="/illustrations/switch-off-finger.webp"
              alt="A finger pressing the light switch off"
              style={{ opacity: offOpacity, y: fingerY }}
              className="absolute inset-0 h-full w-full select-none"
              draggable="false"
            />
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};
