import project1 from "../assets/projects/project-1.webp";
import project2 from "../assets/projects/project-2.webp";
import project3 from "../assets/projects/project-3.webp";
import project4 from "../assets/projects/project-4.webp";

export const HERO_CONTENT = `I'm a full stack web developer with a strong focus on the MERN stack. I specialize in building scalable, high-performance web applications that are both visually polished and functionally robust. Currently, I am expanding my technical scope into Generative AI, Python, and FastAPI, aiming to integrate intelligent, context-aware capabilities into modern web architectures. From crafting responsive front-end interfaces to designing efficient back-end systems, I aim to deliver seamless user experiences across devices.

In addition to my development work, I have experience in filmmaking and video editing, using tools like Adobe Premiere Pro and After Effects.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    title: "Full Stack Developer Intern",
    company: "PICT ECE Department",
    duration: "July 2025 – Aug 2025",
    location: "Pune, Maharashtra",
    description: "Developed 'EventAlly', a MERN stack platform to streamline departmental events, featuring RBAC and real-time user dashboards.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Real-time Dashboards"]
  },
  {
    title: "Content Creation Head — Addiction 2025",
    company: "PICT's Flagship Cultural Event",
    duration: "2025",
    location: "Pune, Maharashtra",
    description: "Leading digital marketing strategies and creative content development for the college's premier cultural festival.",
    technologies: ["Digital Marketing", "Content Strategy", "Creative Development", "Event Management"]
  }
];

export const PROJECTS = [
  {
    title: "E-Commerce Platform 2025",
    image: project1,
    description:
      "A complete MERN stack e-commerce platform with authentication, product management, shopping cart, order processing, and Stripe payment integration. Features role-based access with customer and admin functionalities.",
    technologies: ["React 18", "Tailwind CSS", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary", "Stripe"],
    github: "https://github.com/thepratikpk/E-commerce"
  },
  {
    title: "PredictIT — No-Code ML Pipeline Builder",
    image: project2,
    description:
      "A no-code machine learning platform allowing users to visually design pipelines with dataset upload, preprocessing, and dynamic train-test splits. Delivers real-time accuracy metrics and performance visualizations.",
    technologies: ["React.js", "Python", "FastAPI", "Scikit-learn", "TailwindCSS"],
    github: "https://github.com/thepratikpk/PredictIT"
  },
  {
    title: "EVENTALLY - Adaptive Event Organizer",
    image: project3,
    description:
      "A platform that showcases a generalized list of exciting events for all visitors, with smart filtering and interest-based recommendations.",
    technologies: ["React", "TailwindCss", "MongoDB", "ExpressJs", "NodeJs"],
    github: "https://github.com/thepratikpk/EVENTALLY"
  },
  {
    title: "DocuQuery - Intelligent Document Analysis",
    image: project4,
    description:
      "An AI-powered document analysis system built during a hackathon, enabling semantic search and contextual queries on uploaded documents.",
    technologies: ["React", "TailwindCss", "NodeJs", "MongoDB", "ExpressJs", "LLM", "FAISS"],
    github: "https://github.com/thepratikpk/BFHT"
  },
  {
    title: "Portfolio Website",
    image: project1,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information with video gallery and interactive animations.",
    technologies: ["React", "TailwindCss", "NodeJs", "MongoDB", "ExpressJs", "Framer Motion"],
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
  phoneNo: "+91-7499750322",
  email: "pratikkocharetnp@gmail.com",
};
