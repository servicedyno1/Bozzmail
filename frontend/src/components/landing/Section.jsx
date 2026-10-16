import { motion } from "framer-motion";

export const Section = ({ id, bg = "bg-white", className = "", children, testid }) => (
  <section id={id} className={`${bg} section-pad scroll-mt-20 ${className}`} data-testid={testid}>
    <div className="container-tuta">{children}</div>
  </section>
);

export const SectionTitle = ({ children, className = "text-dunkel", testid }) => (
  <h2 className={`section-title ${className}`} data-testid={testid}>
    {children}
  </h2>
);

export const Reveal = ({ children, delay = 0, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);
