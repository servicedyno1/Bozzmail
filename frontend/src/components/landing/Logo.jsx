export const Logo = ({ className = "", size = "md", product, compactOnMobile = false }) => {
  const mark = size === "lg" ? "h-12" : size === "sm" ? "h-7" : "h-7 md:h-9";
  const text = size === "lg" ? "text-[2.1rem]" : size === "sm" ? "text-[1.25rem]" : "text-[1.2rem] md:text-[1.6rem]";
  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap leading-none ${className}`} data-testid="bozzmail-logo">
      <img src="/brand/mark-lettermark.png" alt="" aria-hidden="true" className={`${mark} w-auto select-none`} draggable="false" />
      <span className={`font-bold italic tracking-[-0.02em] text-tutao ${text}`}>
        <span className={compactOnMobile ? "hidden md:inline" : ""}>bozzmail</span>
        {product ? <span className={`font-semibold not-italic tracking-normal ${compactOnMobile ? "md:ml-1.5" : "ml-1.5"}`}>{product}</span> : null}
      </span>
    </span>
  );
};
