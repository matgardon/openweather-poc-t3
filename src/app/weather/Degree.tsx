export function Degree({ temp }: { temp: number }) {
  return (
    <>
      <span>
        {temp}
        <sup>o</sup>
      </span>
    </>
  );
}
