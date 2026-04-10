import ExperienceClient from "./ExperienceClient";

async function getExperience() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/experiences`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Page() {
  const experiences = await getExperience();

  return <ExperienceClient experiences={experiences} />;
}
