import { fetchProfile, ProfileData, FeaturedProject, Contact } from '@/app/core/Scrawler/profile';
import axios from 'axios';

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';

const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN as string;

type TranslateResult = {
    text: string;
    iso: string;
};

type ChatResponse = {
    text: string;
    imageUrl?: string;
    isMarkdown?: boolean;
};

async function detectLanguage(text: string): Promise<string> {
    const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, to: 'en' }),
    });
    const data: TranslateResult = await res.json();
    return data.iso || 'en';
}

async function translateText(text: string, to: string): Promise<string> {
    const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, to }),
    });
    const data: TranslateResult = await res.json();
    return data.text;
}

async function queryLLM(prompt: string): Promise<string> {
    if (!HUGGINGFACE_API_TOKEN) {
        throw new Error('HUGGINGFACE_API_TOKEN is not set in environment variables');
    }
    const response = await axios.post(
        HUGGINGFACE_API_URL,
        { inputs: prompt },
        {
            headers: {
                Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        }
    );
    if (response.data && Array.isArray(response.data)) {
        return response.data[0]?.generated_text || '';
    }
    return '';
}

// Function to check if the question is asking for specific information
function isSpecificInfoRequest(question: string): { isSpecific: boolean; type: string; key?: string } {
    const normalizedQuestion = question.toLowerCase();

    // Check for contact information requests
    if (
        normalizedQuestion.includes('contact')
        || normalizedQuestion.includes('how contact')
        || normalizedQuestion.includes('get in touch')
        || normalizedQuestion.includes('reach you')
    ) {
        return { isSpecific: true, type: 'contact_all' };
    }
    if (normalizedQuestion.includes('github') || normalizedQuestion.includes('github link')) {
        return { isSpecific: true, type: 'contact', key: 'GitHub' };
    }
    if (normalizedQuestion.includes('linkedin') || normalizedQuestion.includes('linkedin profile')) {
        return { isSpecific: true, type: 'contact', key: 'LinkedIn' };
    }
    if (normalizedQuestion.includes('email') || normalizedQuestion.includes('email address')) {
        return { isSpecific: true, type: 'contact', key: 'Email' };
    }
    if (normalizedQuestion.includes('instagram')) {
        return { isSpecific: true, type: 'contact', key: 'Instagram' };
    }

    // Check for project listing request
    if (
        normalizedQuestion.includes('list all projects')
        || normalizedQuestion.includes('show all projects')
        || normalizedQuestion.includes('what projects')
        || normalizedQuestion.match(/projects\s*\?/)
        || normalizedQuestion.match(/\bprojects?\b/)
    ) {
        return { isSpecific: true, type: 'projects' };
    }

    // Check for About requests
    if (
        normalizedQuestion.includes('about you')
        || normalizedQuestion.includes('about me')
        || normalizedQuestion.includes('bio')
        || normalizedQuestion.includes('sobre você')
        || normalizedQuestion.includes('quem é você')
        || normalizedQuestion.includes('about')
        || normalizedQuestion.match(/\babout\b/)
    ) {
        return { isSpecific: true, type: 'about' };
    }

    // Check for specific project information
    const projectMatch = normalizedQuestion.match(/(?:about|info|information about|tell me about)\s+(\w+)\s+project/i);
    if (projectMatch && projectMatch[1]) {
        return { isSpecific: true, type: 'project', key: projectMatch[1] };
    }

    // Check for profile image request
    if (
        normalizedQuestion.includes('profile picture')
        || normalizedQuestion.includes('avatar')
        || normalizedQuestion.includes('your photo')
        || normalizedQuestion.includes('your image')
        || normalizedQuestion.includes('foto')
        || normalizedQuestion.includes('imagem')
    ) {
        return { isSpecific: true, type: 'image', key: 'profile' };
    }

    return { isSpecific: false, type: '' };
}

// Function to handle specific information requests
function handleSpecificRequest(profileData: ProfileData, requestInfo: { type: string; key?: string }): ChatResponse {
    const { type, key } = requestInfo;

    switch (type) {
        case 'contact_all':
            return {
                text:
                    `Hi there! If you're looking to get in touch with me, here are some options:\n\n`
                    + profileData.contact.map(c => `- **${c.label}:** [${c.url.replace(/^mailto:/, '')}](${c.url})`).join('\n')
                    + `\n\nWhich method do you prefer?`,
                isMarkdown: true
            };
        case 'contact':
        {
            const contactItem = profileData.contact.find(c => c.label.toLowerCase() === (key || '').toLowerCase());
            if (contactItem) {
                if (contactItem.label.toLowerCase() === 'email') {
                    return { text: `[${contactItem.url.replace('mailto:', '')}](${contactItem.url})`, isMarkdown: true };
                }
                return { text: `[${contactItem.label}](${contactItem.url})`, isMarkdown: true };
            }
            break;
        }
        case 'projects':
        {
            const projectsList = profileData.featuredProjects.map(p =>
                `- **[${p.name}](${p.url})**: ${p.description}`).join('\n');
            return { text: `Here are my featured projects:\n${projectsList}`, isMarkdown: true };
        }
        case 'project':
        {
            const project = profileData.featuredProjects.find(p =>
                p.name.toLowerCase().includes((key || '').toLowerCase()));
            if (project) {
                return {
                    text: `**[${project.name}](${project.url})**: ${project.description}`,
                    imageUrl: project.image,
                    isMarkdown: true
                };
            }
            break;
        }
        case 'about':
        {
            const bioText = profileData.profile.bio?.join(' ') || 'No bio available.';
            return {
                text: `**About Me:**\n\n${bioText}`,
                imageUrl: profileData.profile.avatar,
                isMarkdown: true
            };
        }
        case 'image':
            if (key === 'profile' && profileData.profile.avatar) {
                return { text: "Here's my profile picture:", imageUrl: profileData.profile.avatar, isMarkdown: true };
            } else if (profileData.images && profileData.images[key || '']) {
                return { text: `Here's the image you requested:`, imageUrl: profileData.images[key || ''], isMarkdown: true };
            }
            break;
    }

    return { text: '' }; // Empty response if no specific info found
}

function getOptions(profileData: ProfileData): string {
    const options = [
        'Projects',
        'About',
        'Contact',
        'Avatar',
        ...(profileData.contact.map(c => c.label)),
        ...(profileData.featuredProjects.map(p => p.name)),
    ];
    // Remove duplicates and empty
    const uniqueOptions = [...new Set(options.filter(Boolean))];
    return `Sorry, I couldn't understand your request. Here are some options you can try:\n\n- ${uniqueOptions.join('\n- ')}\n\nPlease type one of the options above.`;
}

export async function chatWithProfileLLM(userQuestion: string): Promise<ChatResponse> {
    const userLang = await detectLanguage(userQuestion);
    const profileData: ProfileData = await fetchProfile();

    // Check if this is a specific information request
    const requestInfo = isSpecificInfoRequest(userQuestion);

    if (requestInfo.isSpecific) {
        const specificResponse = handleSpecificRequest(profileData, requestInfo);
        if (specificResponse.text) {
            if (userLang !== 'en') {
                specificResponse.text = await translateText(specificResponse.text, userLang);
            }
            return specificResponse;
        }
    }

    // If not a specific request or no specific info found, show options (fallback)
    const optionsMessage = getOptions(profileData);
    let fallbackText = optionsMessage;
    if (userLang !== 'en') {
        fallbackText = await translateText(optionsMessage, userLang);
    }

    return { text: fallbackText, isMarkdown: true };
}