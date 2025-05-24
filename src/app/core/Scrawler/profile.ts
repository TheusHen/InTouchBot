import axios from 'axios';

// Types for new API structure
export type Social = {
    label: string;
    url: string;
};

export type HackClubInfo = {
    image: string;
    name: string;
    description: string;
};

export type CollegeAppCountdown = {
    until: string;
};

export type ProfileData = {
    profile: {
        name: string;
        age: number;
        bio: string[];
        avatar?: string;
        photo?: string;
        flag?: string;
        socials?: Social[];
        hackclub?: HackClubInfo;
        college_app_countdown?: CollegeAppCountdown;
    };
    featuredProjects: {
        name: string;
        description: string;
        url: string;
        image?: string;
        type?: string[];
    }[];
    githubProjects?: {
        id: number;
        name: string;
        description: string | null;
        html_url: string;
        stargazers_count: number;
        language: string | null;
        owner: {
            avatar_url: string;
        };
        fork: boolean;
        homepage: string | null;
        topics: string[];
    }[];
    contact: {
        icon?: string;
        label: string;
        subtitle?: string;
        url: string;
    }[];
    images?: { [key: string]: string };
};

// Fetch profile data directly from API
export async function fetchProfile(): Promise<ProfileData> {
    try {
        const response = await axios.get('https://www.theushen.me/api/about');
        const data = response.data;

        // Normalize avatar/photo for compatibility
        const avatar = data.profile.photo || data.profile.avatar;

        // Add avatar and images fields for compatibility
        return {
            ...data,
            profile: {
                ...data.profile,
                avatar,
            },
            images: {
                profile: avatar,
                ...(data.images || {}),
            },
        };
    } catch (error) {
        console.error('Error fetching profile from API:', error);
        throw error;
    }
}