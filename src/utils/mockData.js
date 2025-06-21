const mockCourses = [
  'Frontend', 'Backend', 
  'Artificial Intelligence', 'Machine Learning', 
  'Data Science', 'Database', 
  'Cloud Computing', 'Mobile Development', 
  'Web Development', 'Game Development'
]

 const mockQuestions = [
  {
    id: 1,
    title: 'How to sort items in a dictionary in Python?',
    description: 'I am trying to sort a Python dictionary by values. What’s the most efficient way to do it?',
    answers: 42,
    views: 12,
    tags: ['Python', 'Basics'],
    author: 'Alice Johnson',
    postedAt: '2024-12-01T14:30:00Z'
  },
  {
    id: 2,
    title: 'API request returns 404 error',
    description: 'I am getting a 404 error when trying to fetch data from an endpoint. The URL seems correct.',
    answers: 2,
    views: 120,
    tags: ['API', 'HTML'],
    author: 'Mark Lee',
    postedAt: '2025-01-12T10:15:00Z'
  },
  {
    id: 3,
    title: 'React State not updating immediately',
    description: 'My React state is not reflecting changes immediately after setState. What am I missing?',
    answers: 65,
    views: 456,
    tags: ['Javascript', 'React'],
    author: 'Nina Sharma',
    postedAt: '2025-03-05T08:45:00Z'
  },
  {
    id: 4,
    title: 'How to center a div in CSS',
    description: 'I’m trying to center a div vertically and horizontally. Which CSS techniques are best?',
    answers: 8,
    views: 65,
    tags: ['Frontend', 'CSS'],
    author: 'David Kim',
    postedAt: '2025-02-28T16:20:00Z'
  },
  {
    id: 5,
    title: 'Trouble deploying next.js app',
    description: 'Deployment is failing for my Next.js project on Vercel. What should I check?',
    answers: 0,
    views: 65208,
    tags: ['Typescript', 'Next'],
    author: 'Fatima Noor',
    postedAt: '2025-06-01T13:05:00Z'
  },
]


const mockAnswers = [
  {
    questionId: 1,
    answers: [
      {
        id: 101,
        author: 'py_guru',
        content: `You can use the built-in \`sorted()\` function with \`items()\` to sort by keys or values:\n\n**Sort by keys (ascending):**\n\`\`\`python\nsorted_dict = dict(sorted(my_dict.items()))\n\`\`\`\n\n**Sort by values (descending):**\n\`\`\`python\nsorted_dict = dict(sorted(my_dict.items(), key=lambda item: item[1], reverse=True))\n\`\`\``,
        upvotes: 12,
        downvotes: 1,
        postedAt: '2025-06-15T12:00:00Z',
      },
      {
        id: 102,
        author: 'datasci_dan',
        content: `Another clean method:\n\`\`\`python\nfrom collections import OrderedDict\n\n# Ascending by values\nOrderedDict(sorted(my_dict.items(), key=lambda t: t[1]))\n\`\`\``,
        upvotes: 8,
        downvotes: 0,
        postedAt: '2025-06-15T12:30:00Z',
      }
    ]
  },
  {
    questionId: 2,
    answers: [
      {
        id: 201,
        author: 'api_fixer',
        content: `Double check the endpoint URL. A 404 typically means the endpoint doesn't exist. Also verify if any auth tokens are required in headers.`,
        upvotes: 5,
        downvotes: 2,
        postedAt: '2025-06-14T10:00:00Z',
      },
      {
        id: 202,
        author: 'devbot',
        content: `Are you making a \`GET\` request to a \`POST\`-only route? Check API docs and your method.`,
        upvotes: 3,
        downvotes: 1,
        postedAt: '2025-06-14T10:45:00Z',
      }
    ]
  },
  {
    questionId: 3,
    answers: [
      {
        id: 301,
        author: 'reactor',
        content: `React state updates are asynchronous. If you log right after \`setState\`, you won’t see the change immediately. Use \`useEffect()\` to respond to changes.`,
        upvotes: 25,
        downvotes: 3,
        postedAt: '2025-06-13T15:00:00Z',
      },
      {
        id: 302,
        author: 'hooks_master',
        content: `Also make sure you're not mutating the state directly. Always use the setter function returned by \`useState\`.`,
        upvotes: 17,
        downvotes: 0,
        postedAt: '2025-06-13T15:10:00Z',
      }
    ]
  },
  {
    questionId: 4,
    answers: [
      {
        id: 401,
        author: 'csslegend',
        content: `Try this method using Flexbox:\n\`\`\`css\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\`\`\``,
        upvotes: 6,
        downvotes: 0,
        postedAt: '2025-06-15T20:00:00Z',
      }
    ]
  },
  {
    questionId: 5,
    answers: [] // No answers yet
  }
]

const mockTeams = [
  {
    name: "OpenAI Research",
    members: 42,
    visibility: "Public",
    status: "join",
    description: "Exploring frontier AI capabilities.",
    tags: ["AI", "ML", "Research"],
    category: "tech"
  },
  {
    name: "Figma Designers",
    members: 23,
    visibility: "Private",
    status: "requested",
    description: "Design team collaborating on UI/UX.",
    tags: ["Design", "UI", "Prototyping"],
    category: "design"
  },
  {
    name: "React Contributors",
    members: 15,
    visibility: "Public",
    status: "join",
    description: "Open source contributors to React.js.",
    tags: ["React", "Open Source"],
    category: "tech"
  },
  {
    name: "DevOps Masters",
    members: 9,
    visibility: "Private",
    status: "join",
    description: "Infrastructure, CI/CD & deployment experts.",
    tags: ["DevOps", "CI/CD"],
    category: "tech"
  },
  {
    name: "CyberSec Guild",
    members: 11,
    visibility: "Private",
    status: "join",
    description: "Ethical hackers and security researchers.",
    tags: ["Cybersecurity", "Ethical Hacking"],
    category: "tech"
  },
  {
    name: "Data Science Central",
    members: 18,
    visibility: "Public",
    status: "already",
    description: "Applied data science for business insights.",
    tags: ["Data", "Analytics"],
    category: "tech"
  },
  {
    name: "Next.js Builders",
    members: 13,
    visibility: "Public",
    status: "join",
    description: "Web developers focused on Next.js projects.",
    tags: ["Next.js", "Web"],
    category: "tech"
  },
  {
    name: "Game Dev League",
    members: 27,
    visibility: "Private",
    status: "join",
    description: "Unity and Unreal developers & designers.",
    tags: ["Games", "Unity", "Unreal"],
    category: "design"
  }
]

const mockButtonLables = (status) => {
  switch (status) {
    case 'join': return 'Request to Join';
    case 'requested': return 'Requested';
    case 'already': return 'Already in team';
    default: return 'Join';
  }
}

const mockUsers = [
  { name: "Alice", skills: ["React", "UI/UX"], isLeader: true },
  { name: "Bob", skills: ["Node.js", "MongoDB"], isLeader: false },
  { name: "Charlie", skills: ["GraphQL", "TypeScript"], isLeader: false },
  { name: "Dave", skills: ["Tailwind CSS", "Next.js"], isLeader: false }
]

const mockMyTeam = {
  name: "Alpha Coders",
  description: "A passionate group of developers building open source tools.",
  tags: ["React", "Node.js", "GraphQL", "Tailwind CSS"],
  notice: "Team meeting scheduled on Friday at 5 PM. Be prepared with your weekly updates.",
  members: mockUsers
}

export {
  mockCourses,
  mockQuestions,
  mockAnswers,
  mockTeams,
  mockButtonLables,
  mockUsers,
  mockMyTeam
}