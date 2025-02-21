const fs = require("fs");
const path = require("path");

const BASE_URL = "https://prashna-patra-client.vercel.app"; // Replace with your actual domain

// Define your routes
const routes = [
    "/",
    "/home",
    "/home/subject/math",
    "/home/subject/science",
    "/createTest/english",
    "/createTest/history",
    "/login",
    "/signup",
    "/payment",
    "/attemptTest",
    "/contact-us",
    "/terms-and-condition",
    "/refund-policy",
    "/shipping-policy",
];

// Generate XML content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => `
        <url>
            <loc>${BASE_URL}${route}</loc>
            <priority>0.8</priority>
        </url>
    `).join("")}
</urlset>`;

// Save sitemap.xml
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapContent);

console.log("✅ Sitemap generated successfully!");
