import axios from 'axios';

// Define the profile data structure
export type FeaturedProject = {
    name: string;
    description: string;
    url: string;
    image?: string;
};

export type Contact = {
    label: string;
    url: string;
};

export type ProfileData = {
    profile: {
        name: string;
        age: number;
        bio: string[];
        avatar?: string; // Optional profile picture
    };
    featuredProjects: FeaturedProject[];
    contact: Contact[];
    images?: { [key: string]: string }; // Optional map of image identifiers to URLs
};

// Static profile data
const profileData: ProfileData = {
    profile: {
        name: "Matheus Henrique",
        age: 25,
        bio: [
            "Full-stack developer with expertise in React, Node.js, and TypeScript.",
            "Passionate about creating intuitive and efficient web applications.",
            "Currently working on personal projects and open to new opportunities."
        ],
        avatar: "https://github.com/theushen.png"
    },
    featuredProjects: [
        {
            name: "InTouchBot",
            description: "A chatbot that provides information about me and my work.",
            url: "https://github.com/theushen/InTouchBot",
            image: "https://example.com/intouchbot.png"
        },
        {
            name: "Portfolio Website",
            description: "My personal portfolio website showcasing my projects and skills.",
            url: "https://theushen.me",
            image: "https://example.com/portfolio.png"
        }
    ],
    contact: [
        {
            label: "GitHub",
            url: "https://github.com/theushen"
        },
        {
            label: "LinkedIn",
            url: "https://linkedin.com/in/theushen"
        },
        {
            label: "Email",
            url: "mailto:contact@theushen.me"
        }
    ],
    images: {
        "profile": "https://github.com/theushen.png",
        "project1": "https://example.com/intouchbot.png",
        "project2": "https://example.com/portfolio.png"
    }
};

// Function to fetch profile data from API (fallback)
async function fetchProfileFromAPI() {
    try {
        const response = await axios.get('https://www.theushen.me/api/about');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile from API:', error);
        return null;
    }
}

// Export function to get profile data
export async function fetchProfile(): Promise<ProfileData> {
    try {
        // First try to use the static profile data
        if (profileData) {
            return profileData;
        }
        
        // Fallback to API if static data is not available
        const apiData = await fetchProfileFromAPI();
        if (apiData) {
            return apiData;
        }
        
        throw new Error('Failed to fetch profile data');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}