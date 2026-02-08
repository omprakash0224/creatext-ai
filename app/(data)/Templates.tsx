export default [
    {
        name: 'Blog Title',
        desc: 'An AI tool that generate blog title for you',
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/2800/2800039.png',
        aiPrompt: 'Give me 5 blog title ideas in bullet wise only on give niche topic and give result in Rich text editor format',
        slug: 'generate-blog-title',
        form: [
            {
                label: 'Enter your blog niche',
                field: 'input',
                name: 'niche',
                required: true,
                type: 'text',
            }
        ]
    },
    {
        name: "Blog Outline",
        desc: "An AI tool that generates structured blog outlines for you",
        category: "Blog",
        icon: "https://cdn-icons-png.flaticon.com/128/1187/1187595.png",
        aiPrompt: "Generate a detailed blog outline based on the given niche topic. Use bullet points and headings.",
        slug: "generate-blog-outline",
        form: [
            {
                label: "Enter your blog topic",
                field: "input",
                name: "topic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Ad Copy Generator",
        desc: "An AI tool that generates compelling ad copies",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/1968/1968641.png",
        aiPrompt: "Generate 3 engaging ad copies for a {product/service} in a given tone (e.g., persuasive, humorous, professional).Use bullet points and headings.",
        slug: "generate-ad-copy",
        form: [
            {
                label: "Enter your product/service",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            },
            {
                label: "Select tone",
                field: "dropdown",
                name: "tone",
                required: true,
                options: ["Persuasive", "Humorous", "Professional", "Casual"]
            }
        ]
    },
    {
        name: "Instagram Caption",
        desc: "An AI tool that generates creative Instagram captions",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/1384/1384031.png",
        aiPrompt: "Generate 5 engaging Instagram captions related to {niche} with relevant emojis.",
        slug: "generate-instagram-caption",
        form: [
            {
                label: "Enter your niche or post theme",
                field: "input",
                name: "niche",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Product Description",
        desc: "An AI tool that creates detailed product descriptions",
        category: "E-commerce",
        icon: "https://cdn-icons-png.flaticon.com/128/679/679746.png",
        aiPrompt: "Write a compelling product description for a {product} in a {tone} tone.",
        slug: "generate-product-description",
        form: [
            {
                label: "Enter your product name",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            },
            {
                label: "Select description tone",
                field: "dropdown",
                name: "tone",
                required: true,
                options: ["Professional", "Casual", "Persuasive", "Luxury"]
            }
        ]
    },
    {
        name: "YouTube Video Script",
        desc: "An AI tool that generates video scripts for YouTube content",
        category: "Video",
        icon: "https://cdn-icons-png.flaticon.com/128/1384/1384012.png",
        aiPrompt: "Generate a full YouTube video script for a video on {topic}, including an introduction, main content, and call-to-action.",
        slug: "generate-youtube-script",
        form: [
            {
                label: "Enter your video topic",
                field: "input",
                name: "topic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "YouTube Video Title Generator",
        desc: "An AI tool to Get clickable and SEO-friendly YouTube titles",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/1179/1179120.png",
        aiPrompt: "Give me 5 high-engagement YouTube video title ideas for the topic: {videoTopic}.",
        slug: "generate-youtube-titles",
        form: [
            {
                label: "Enter your video topic",
                field: "input",
                name: "videoTopic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "YouTube Description Generator",
        desc: "An AI tool that Generate compelling video descriptions with SEO keywords",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/5787/5787480.png",
        aiPrompt: "Write a YouTube video description for a video about {topic}, including relevant keywords and a CTA to subscribe.",
        slug: "generate-youtube-description",
        form: [
            {
                label: "Enter your video topic",
                field: "input",
                name: "topic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "SEO Keyword Generator",
        desc: "An AI tool that suggests SEO-friendly keywords for your blog or website",
        category: "SEO",
        icon: "https://cdn-icons-png.flaticon.com/128/3494/3494271.png",
        aiPrompt: "Generate a list of 10 SEO keywords and long-tail keyword suggestions for the given topic or niche.",
        slug: "generate-seo-keywords",
        form: [
            {
                label: "Enter your topic or niche",
                field: "input",
                name: "topic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Instagram Hashtag Generator",
        desc: "An AI tool that generates popular and relevant hashtags for Instagram posts",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/8369/8369144.png",
        aiPrompt: "Generate 15 trending and niche-specific Instagram hashtags for the given post topic.",
        slug: "generate-instagram-hashtags",
        form: [
            {
                label: "Enter your Instagram post topic",
                field: "input",
                name: "postTopic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Instagram Reel Ideas",
        desc: "An AI tool that gives you fresh and viral Instagram reel ideas",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/12595/12595820.png",
        aiPrompt: "Give me 5 unique and creative Instagram reel content ideas for the given niche or theme. Make them short and catchy.",
        slug: "generate-instagram-reel-ideas",
        form: [
            {
                label: "Enter your niche or reel theme",
                field: "input",
                name: "niche",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Twitter/X Post Generator",
        desc: "An AI tool that crafts engaging tweets with or without hashtags",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/5968/5968830.png",
        aiPrompt: "Generate 3 short and engaging tweet ideas on the given topic. Keep them under 280 characters and add relevant hashtags.",
        slug: "generate-twitter-posts",
        form: [
            {
                label: "Enter tweet topic",
                field: "input",
                name: "topic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "LinkedIn Post Generator",
        desc: "An AI tool that helps you write professional and engaging LinkedIn posts",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/3536/3536569.png",
        aiPrompt: "Write a LinkedIn post about {topic}. Keep it professional, thoughtful, and include a call-to-action.",
        slug: "generate-linkedin-post",
        form: [
            {
                label: "Enter your post topic or idea",
                field: "input",
                name: "topic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Instagram Story Ideas",
        desc: "An AI tool that gives interactive and engaging Instagram story content ideas",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/5948/5948875.png",
        aiPrompt: "Give me 5 fun, engaging, and interactive Instagram story ideas for the given niche or brand.",
        slug: "generate-instagram-story-ideas",
        form: [
            {
                label: "Enter your brand or niche",
                field: "input",
                name: "niche",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Social Media Bio Generator",
        desc: "An AI tool that generates catchy bios for Instagram, Twitter, or LinkedIn",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/4187/4187236.png",
        aiPrompt: "Generate 3 creative and catchy social media bios for the given niche. Make them suitable for platforms like Instagram, Twitter, or LinkedIn.",
        slug: "generate-social-media-bio",
        form: [
            {
                label: "Enter your niche or personality type",
                field: "input",
                name: "niche",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Email Copy Generator",
        desc: "An AI tool that crafts persuasive email content for marketing campaigns",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/945/945467.png",
        aiPrompt: "Write a promotional email for {product/service} in a {tone} tone. Include a compelling subject line, intro, value prop, and CTA.",
        slug: "generate-email-copy",
        form: [
            {
                label: "Enter your product/service",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            },
            {
                label: "Select tone",
                field: "dropdown",
                name: "tone",
                required: true,
                options: ["Professional", "Friendly", "Persuasive", "Excited"]
            }
        ]
    },
    {
        name: "Landing Page Headline",
        desc: "An AI tool that generates attention-grabbing landing page headlines",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/699/699931.png",
        aiPrompt: "Generate 5 compelling and conversion-focused headlines for a landing page promoting {product/service}.",
        slug: "generate-landing-headline",
        form: [
            {
                label: "Enter your product or service name",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Value Proposition Generator",
        desc: "An AI tool that crafts powerful value propositions for your product or brand",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/11476/11476429.png",
        aiPrompt: "Create a strong value proposition for a brand or product named {product} in the {industry} industry. Keep it short and impactful.",
        slug: "generate-value-proposition",
        form: [
            {
                label: "Enter your product or brand name",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            },
            {
                label: "Enter your industry or niche",
                field: "input",
                name: "industry",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "CTA Generator",
        desc: "An AI tool that generates effective call-to-action lines for your campaigns",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/6010/6010026.png",
        aiPrompt: "Generate 5 engaging and action-driven CTA lines for a {product/service}.",
        slug: "generate-cta",
        form: [
            {
                label: "Enter your product/service",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "AIDA Copy Generator",
        desc: "An AI tool that generates copy using the proven AIDA marketing framework",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/11494/11494232.png",
        aiPrompt: "Write marketing copy for {product/service} using the AIDA framework: Attention, Interest, Desire, and Action.",
        slug: "generate-aida-copy",
        form: [
            {
                label: "Enter your product/service name",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Pinterest Description Generator",
        desc: "Get SEO-optimized and engaging descriptions for your Pinterest pins",
        category: "Social Media",
        icon: "https://cdn-icons-png.flaticon.com/128/25/25698.png",
        aiPrompt: "Create 5 engaging Pinterest pin descriptions for the topic {pinTopic}.",
        slug: "generate-pinterest-description",
        form: [
            {
                label: "Enter your pin topic",
                field: "input",
                name: "pinTopic",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "USP Generator",
        desc: "Generate a unique selling proposition based on your product and target audience",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/4827/4827307.png",
        aiPrompt: "Write a compelling unique selling proposition for a product called {productName} targeted at {audience}.",
        slug: "generate-usp",
        form: [
            {
                label: "Enter your product name",
                field: "input",
                name: "productName",
                required: true,
                type: "text"
            },
            {
                label: "Enter your target audience",
                field: "input",
                name: "audience",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Google Ad Copy Generator",
        desc: "Create compelling Google ads for your products or services",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/3162/3162258.png",
        aiPrompt: "Generate 10 Google ad copies for a product named {product} with a focus on {focus}. Keep it under 90 characters.",
        slug: "generate-google-ad-copy",
        form: [
            {
                label: "Enter product name",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            },
            {
                label: "What is the focus of the ad?",
                field: "input",
                name: "focus",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Facebook Ad Copy Generator",
        desc: "Craft engaging Facebook ads with CTAs",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/10846/10846647.png",
        aiPrompt: "Write 10 Facebook ad copies for {product} with a goal to {goal}. Include a strong CTA.",
        slug: "generate-facebook-ad-copy",
        form: [
            {
                label: "Enter product or service name",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            },
            {
                label: "What is the ad goal?",
                field: "input",
                name: "goal",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Referral Program Message Generator",
        desc: "Generate compelling referral program invites",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/1953/1953403.png",
        aiPrompt: "Write a referral message for {product} offering a reward of {reward}. Keep it friendly and motivating.",
        slug: "generate-referral-message",
        form: [
            {
                label: "Enter your product name",
                field: "input",
                name: "product",
                required: true,
                type: "text"
            },
            {
                label: "Mention referral reward",
                field: "input",
                name: "reward",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Webinar Promo Copy Generator",
        desc: "Create promotional content for webinars",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/2997/2997495.png",
        aiPrompt: "Write 3 promotional posts to promote a webinar on {topic} happening on {date}. Include a clear CTA.",
        slug: "generate-webinar-promo",
        form: [
            {
                label: "Webinar topic",
                field: "input",
                name: "topic",
                required: true,
                type: "text"
            },
            {
                label: "Webinar date",
                field: "input",
                name: "date",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Case Study Outline Generator",
        desc: "Generate outlines for writing persuasive case studies",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/1654/1654190.png",
        aiPrompt: "Create an outline for a case study for {companyName} which helped client {clientName} achieve {result} using {solution}.",
        slug: "generate-case-study-outline",
        form: [
            {
                label: "Your company name",
                field: "input",
                name: "companyName",
                required: true,
                type: "text"
            },
            {
                label: "Client name",
                field: "input",
                name: "clientName",
                required: true,
                type: "text"
            },
            {
                label: "Result achieved",
                field: "input",
                name: "result",
                required: true,
                type: "text"
            },
            {
                label: "Solution used",
                field: "input",
                name: "solution",
                required: true,
                type: "text"
            }
        ]
    },
    {
        name: "Brand Story Generator",
        desc: "Craft a compelling brand origin and mission story",
        category: "Marketing",
        icon: "https://cdn-icons-png.flaticon.com/128/12472/12472500.png",
        aiPrompt: "Write a brand story for {brandName} that started with {origin} and aims to {mission}. Keep it emotionally engaging.",
        slug: "generate-brand-story",
        form: [
            {
                label: "Brand name",
                field: "input",
                name: "brandName",
                required: true,
                type: "text"
            },
            {
                label: "Brand origin story",
                field: "input",
                name: "origin",
                required: true,
                type: "text"
            },
            {
                label: "Brand mission",
                field: "input",
                name: "mission",
                required: true,
                type: "text"
            }
        ]
    }
]