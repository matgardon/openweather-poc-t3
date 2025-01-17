// By: tabler
// See: https://v0.app/icon/tabler/star
// Example: <IconTablerStar width="24px" height="24px" style={{color: "#000000"}} />

export default function StarIcon({
  height = "1em",
  strokeWidth = "2",
  fill = "none",
  focusable = "false",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      focusable={focusable}
      {...props}
    >
      <path
        fill={fill}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
      />
    </svg>
  );
}
