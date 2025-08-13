import project1 from "../assets/projects/project-1.webp";
import project2 from "../assets/projects/project-2.webp";
import project3 from "../assets/projects/project-3.webp";
import project4 from "../assets/projects/project-4.webp";

export const HERO_CONTENT = `I'm a full stack web developer with a strong focus on the MERN stack — MongoDB, Express.js, React.js, and Node.js. I specialize in building scalable, high-performance web applications that are both visually polished and functionally robust. From crafting responsive front-end interfaces to designing efficient back-end systems, I aim to deliver seamless user experiences across devices.

In addition to my development work, I have experience in filmmaking and video editing, using tools like Adobe Premiere Pro and After Effects.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  
];

export const PROJECTS = [
  {
    title: "EVENTALLY - Adaptive Event Organizer",
    image: project1,
    description:
      "A platform that showcases a generalized list of exciting events for all visitors, with smart filtering and interest-based recommendations.",
    technologies: ["React", "TailwindCss", "MongoDB", "ExpressJs", "NodeJs"],
    github: "https://github.com/thepratikpk/EVENTALLY"
  },
  {
    title: "DocuQuery - Intelligent Document Analysis",
    image: project4, // replace with your imported image variable
    description:
      "An AI-powered document analysis system built during a hackathon, enabling semantic search and contextual queries on uploaded documents.",
    technologies: ["React", "TailwindCss", "NodeJs", "MongoDB", "ExpressJs", "LLM", "FAISS"],
    github: "https://github.com/thepratikpk/BFHT" // replace with actual repo link
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["React", "TailwindCss", "NodeJs", "MongoDB", "ExpressJs"],
    github: "https://github.com/thepratikpk/Portfolio_Pratik_Kochare"
  },
];



export const VIDEOS=[
  {
    id: 1,
    title: "Yes,I am Filmmaker",
    videoUrl: "https://res.cloudinary.com/dqvllpngm/video/upload/v1746124907/Yes_I_am_Filmmaker_oqumst.mp4",
    description: "Fast-paced edits covering a cultural college event.",
  },
  {
    id: 2,
    title: "Fas Fas Fas",
    videoUrl: "https://res.cloudinary.com/dqvllpngm/video/upload/v1746125714/Fas_Fas_Fss_osp4xi.mp4",
    description: "A short cinematic film showcasing my storytelling and pacing.",
  },
  {
    id: 3,
    title: "It's just a dream",
    videoUrl: "https://res.cloudinary.com/dqvllpngm/video/upload/v1746126406/It_s_just_a_dream_ujazrj.mp4",
    description: "A short cinematic film showcasing my storytelling and pacing.",
  },
  
  
  // Add more videos...
];
export const CONTACT = {
  phoneNo: "7499750322",
  email: "pratikpkochare@gmail.com",
};
