import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const MixedHeading = ({ light, bold, dark = false, className = "" }) => (
  <h2
    className={`font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] ${
      dark ? "text-white" : "text-ink"
    } ${className}`}
  >
    {light}{" "}
    <span className={`font-extrabold ${dark ? "text-white" : "text-brand"}`}>{bold}</span>
  </h2>
);
