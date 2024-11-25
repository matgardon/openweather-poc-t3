// this is mostly a test of a server page that should be rendered fully static
// to understand some details about the rendering logic.
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[80%] text-center">
      <h3 className="text-white-900 mt-20 text-3xl font-bold !leading-[1.4] md:text-4xl">
        POC of a weather-app implementation using the T3 stack
      </h3>
      {/* <p>
        Stack: Next.js (15, w/ AppRouter) / trpc / Tailwind / prisma / NextAuth
        / zod / OpenWeather API (OneCall 3.0)
      </p> */}
    </div>
  );
}
