interface Tutor {
  id: number;
  name: string;
  image: any; // Use 'any' for image source, or define a specific type if needed
  subject: string;
  yearsOfExperience: number;
  achievements: string[];
}

const tutorsData: Tutor[] = [
  {
    id: 1,
    name: "Armm",
    image: require('../../assets/images/edu.jpg'), // Ensure this path is correct
    subject: "Cybersecurity",
    yearsOfExperience: 5,
    achievements: ["Certified Ethical Hacker", "CISSP"],
  },
//   {
//     id: 2,
//     name: "Waheed",
//     image: require('../../assets/images/edu.jpg'), // Ensure this path is correct
//     subject: "Cybersecurity",
//     yearsOfExperience: 3,
//     achievements: ["CompTIA Security+", "CEH"],
//   },
//   {
//     id: 3,
//     name: "A Hannan",
//     image: require('../../assets/images/edu.jpg'), // Ensure this path is correct
//     subject: "Full Stack Development",
//     yearsOfExperience: 4,
//     achievements: ["MERN Stack Certified", "Top 10% on Codewars"],
//   },
//   {
//     id: 4,
//     name: "Bhareef",
//     image: require('../../assets/images/edu.jpg'), // Ensure this path is correct
//     subject: "Data Engineering",
//     yearsOfExperience: 6,
//     achievements: ["AWS Certified Solutions Architect", "Data Science Bootcamp"],
//   },
  // Add more tutors as needed
];

export default tutorsData; 