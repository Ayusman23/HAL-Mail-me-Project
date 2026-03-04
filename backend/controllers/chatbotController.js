const asyncHandler = require("express-async-handler");

const allTemplates = [
    {
        category: "Job Application",
        type: "cold-email",
        keywords: ["job", "apply", "application", "hiring"],
        content: "Subject: Application for {Position} - {Your Name}\n\nDear {Hiring Manager Name},\n\nI am writing to express my strong interest in the {Position} opening at {Company Name}. With my background in {Your Field}, I am confident I can contribute effectively to your team.\n\nBest regards,\n{Your Name}"
    },
    {
        category: "Business Outreach",
        type: "cold-email",
        keywords: ["business", "partnership", "collaboration", "outreach"],
        content: "Subject: Potential Partnership Opportunity\n\nHi {Name},\n\nI've been following {Company Name} and am impressed by your work in {Industry}. I'd love to discuss how we might collaborate on {Project}.\n\nBest,\n{Your Name}"
    },
    {
        category: "Follow-up",
        type: "professional",
        keywords: ["follow up", "following up", "check in"],
        content: "Subject: Following up on our meeting\n\nHi {Name},\n\nIt was great speaking with you last week. Just wanted to follow up on the {Topic} we discussed. Do you have any updates?\n\nRegards,\n{Your Name}"
    },
    {
        category: "Meeting Request",
        type: "official",
        keywords: ["meeting", "schedule", "discuss"],
        content: "Subject: Meeting Request: {Topic}\n\nDear {Name},\n\nI would like to request a brief meeting to discuss {Topic}. Are you available on {Date} at {Time}?\n\nSincerely,\n{Your Name}"
    },
    {
        category: "Leave Application",
        type: "official",
        keywords: ["leave", "sick", "vacation", "absence"],
        content: "Subject: Leave Application - {Your Name}\n\nDear {Manager Name},\n\nI am writing to request a leave of absence from {Start Date} to {End Date} due to {Reason}.\n\nThank you,\n{Your Name}"
    },
    {
        category: "Promotional Offer",
        type: "promotional",
        keywords: ["deal", "discount", "offer", "sale"],
        content: "Subject: Exclusive {Percentage}% Discount Inside!\n\nHi {Name},\n\nWe're excited to offer you a special {Percentage}% discount on all our products. Use code SAVE{Percentage} at checkout!\n\nCheers,\nThe {Company} Team"
    },
    {
        category: "Product Launch",
        type: "promotional",
        keywords: ["launch", "new product", "announcement"],
        content: "Subject: Introducing the all-new {Product Name}!\n\nHi {Name},\n\nThe wait is over! We've just launched {Product Name}, designed to help you {Benefit}.\n\nBest,\nThe {Company} Team"
    },
    {
        category: "Event Invitation",
        type: "non-official",
        keywords: ["party", "invite", "event", "celebration"],
        content: "Subject: You're Invited to {Event Name}!\n\nHi {Name},\n\nWe're hosting a {Event Name} on {Date} and would love for you to join us! Please RSVP by {RSVP Date}.\n\nBest,\n{Your Name}"
    },
    {
        category: "Personal Greeting",
        type: "personal",
        keywords: ["hello", "hi", "catching up"],
        content: "Subject: Just saying hi!\n\nHey {Name},\n\nIt's been a while! Hope everything is going well with you. Let's catch up soon.\n\nCheers,\n{Your Name}"
    },
    {
        category: "Customer Support",
        type: "service",
        keywords: ["support", "help", "issue", "problem"],
        content: "Subject: Re: Your Support Request {Ticket ID}\n\nHi {Name},\n\nThank you for reaching out. We are looking into the issue with {Issue Description} and will get back to you within 24 hours.\n\nBest regards,\n{Support Agent Name}"
    },
    { category: "Internship Request", type: "cold-email", keywords: ["internship", "intern", "student"], content: "Subject: Internship Inquiry - {Your Name}\n\nDear {Name},\n\nI am a {Year} student at {University} and I am interested in an internship at {Company}." },
    { category: "Sales Pitch", type: "promotional", keywords: ["pitch", "sell", "product"], content: "Subject: Solving your {Problem} with {Product}\n\nHi {Name},\n\nDo you struggle with {Problem}? {Product} is here to help." },
    { category: "Newsletter", type: "marketing", keywords: ["newsletter", "update", "monthly"], content: "Subject: {Month} Updates from {Company}\n\nHi {Name},\n\nHere is what we've been up to this month..." },
    { category: "Resignation", type: "official", keywords: ["resign", "quit", "notice"], content: "Subject: Resignation - {Your Name}\n\nDear {Manager},\n\nPlease accept this as formal notice that I am resigning from my position." },
    { category: "Holiday Wishes", type: "personal", keywords: ["holiday", "christmas", "new year"], content: "Subject: Happy Holidays!\n\nWishing you and your family a wonderful holiday season." },
    { category: "Thank You", type: "professional", keywords: ["thank you", "thanks", "appreciate"], content: "Subject: Thank You - {Topic}\n\nHi {Name},\n\nJust wanted to say thank you for {Topic}. I really appreciate it." },
    { category: "Urgent Meeting", type: "official", keywords: ["urgent", "asap", "emergency"], content: "Subject: URGENT Meeting Required\n\nHi {Name},\n\nWe need to meet ASAP regarding {Topic}." },
    { category: "Webinar Invite", type: "promotional", keywords: ["webinar", "online", "training"], content: "Subject: Join our free Webinar on {Topic}!\n\nHi {Name},\n\nSign up today to learn all about {Topic}." },
    { category: "Referral Request", type: "professional", keywords: ["referral", "recommendation"], content: "Subject: Referral Request - {Position}\n\nHi {Name},\n\nI'm applying for {Position} and was wondering if you could refer me?" },
    { category: "Feedback Request", type: "service", keywords: ["feedback", "survey", "review"], content: "Subject: How did we do?\n\nHi {Name},\n\nWe'd love to hear your feedback on your recent experience with us." }
];

const generateEmailContent = asyncHandler(async (req, res) => {
    const { prompt, type } = req.body;

    if (!prompt) {
        res.status(400);
        throw new Error("Prompt is required");
    }

    const lowerPrompt = prompt.toLowerCase();

    // Simple preference/category matching
    let results = allTemplates.filter(t =>
        t.keywords.some(kw => lowerPrompt.includes(kw)) ||
        t.category.toLowerCase().includes(lowerPrompt) ||
        t.type.toLowerCase() === type
    );

    if (results.length === 0) {
        results = [allTemplates[Math.floor(Math.random() * allTemplates.length)]];
    }

    const bestMatch = results[0];

    res.status(200).json({
        content: bestMatch.content,
        category: bestMatch.category,
        allMatches: results.map(r => ({ category: r.category, content: r.content }))
    });
});

const getCategories = asyncHandler(async (req, res) => {
    const categories = Array.from(new Set(allTemplates.map(t => t.category)));
    res.status(200).json(categories);
});

module.exports = { generateEmailContent, getCategories };
