export const userSkills = [
    {
        category: "Frontend Mastery",
        skills: [
            {
                name: "NextJS / ReactJS",
                level: 95,
                iconName: "SiNextdotjs",
                slug: "nextjs",
            },
            {
                name: "React Native",
                level: 85,
                iconName: "SiReact",
                slug: "react-native",
            },
            {
                name: "Typescript",
                level: 90,
                iconName: "SiTypescript",
                slug: "typescript",
            },
            {
                name: "HTML / JS / CSS",
                level: 100,
                iconName: "SiTailwindcss",
                slug: "web-basic",
            },
        ],
    },
    {
        category: "Backend & Real-time",
        skills: [
            { name: "Python", level: 88, iconName: "SiPython", slug: "python" },
            {
                name: "Express",
                level: 88,
                iconName: "SiExpress",
                slug: "express",
            },
            {
                name: "WebSocket",
                level: 80,
                iconName: "SiSocketdotio",
                slug: "websocket",
            },
        ],
    },
];

export const allProjects = [
    {
        _id: "e-invoice",
        title: "E-Invoice System",
        experienceId: "exp-hkstp", // 👈 連結到 Experience
        tech: ["nextjs", "express", "sql-mysql"], // 👈 連結到 Skill Slug
        category: "Full-stack / Enterprise",
        type: "Work",
        source: "HKSTP",
        image: "/image/project-1.png",
        size: "large",
    },
];

// Experience 數據
export const experiences = [
    {
        _id: "exp-hkstp", // 👈 Unique ID
        title: "Senior Software Developer",
        company: "HKSTP",
        startDate: "2024-04-01",
        endDate: null,
        isCurrent: true,
        // 呢間公司主要用嘅 Tech
        mainTech: ["nextjs", "typescript", "express"],
    },
    // ...
];
