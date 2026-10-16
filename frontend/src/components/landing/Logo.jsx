export const Logo = ({ className = "", size = "md", product }) => {
  const mark = size === "lg" ? "h-12" : size === "sm" ? "h-7" : "h-9";
  const text = size === "lg" ? "text-[2.1rem]" : size === "sm" ? "text-[1.25rem]" : "text-[1.6rem]";
  return (
    <span className={`inline-flex items-center gap-2 leading-none ${className}`} data-testid="bozzmail-logo">
      <img src="/brand/mark-lettermark.png" alt="" aria-hidden="true" className={`${mark} w-auto select-none`} draggable="false" />
      <span className={`font-bold italic tracking-[-0.02em] text-tutao ${text}`}>
        bozzmail
        {product ? <span className="ml-1.5 font-semibold not-italic tracking-normal">{product}</span> : null}
      </span>
    </span>
  );
};
