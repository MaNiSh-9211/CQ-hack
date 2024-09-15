const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

// use the stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

exports.runPuppeteer = async (prompt) => {
    let browser;
    try {
        // launch a headless browser with specific arguments
        browser = await puppeteer.launch({
            headless: true, // Run in headless mode
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--disable-blink-features=AutomationControlled'
            ]
        });

        // Open a new page
        const page = await browser.newPage();

        // Set user agent to avoid detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        // Override navigator properties to make automation undetectable
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
            Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
            Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
        });

        // Navigate to the blackbox.ai website
        await page.goto('https://blackbox.ai', { waitUntil: 'networkidle2' });

        // Wait for the textarea and focus on it
        const textareaSelector = 'textarea[placeholder="Message Blackbox..."]';
        await page.waitForSelector(textareaSelector);
        await page.focus(textareaSelector);

        // Enter the text into the textarea
        await page.keyboard.type(prompt);

        // Wait for the button and click on it
        const buttonSelector = 'button[type="submit"] svg path[d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"]';
        await page.waitForSelector(buttonSelector);
        await page.click(buttonSelector);

        console.log('Button clicked successfully.');

        // Wait for 10 seconds to allow dynamic content to load
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Extract content of all <p> tags with class "mb-2 last:mb-0"
        const pTagsContent = await page.evaluate(() => {
            const pTags = document.querySelectorAll('p.mb-2.last\\:mb-0');
            const contentArray = [];
            pTags.forEach((tag, index) => {
                if (index !== 0) { // Skip the first <p> tag
                    contentArray.push(tag.textContent.trim());
                }
            });
            return contentArray;
        });

        // Print the content of all <p> tags to the console
        console.log('Content of <p> tags:');
        pTagsContent.forEach(content => {
            console.log(content);
        });

        // Write the extracted content to a file
        fs.writeFileSync('./cq-hack/testing/res.txt', pTagsContent.join('\n'));

        // Take a screenshot of the page
        await page.screenshot({ path: './cq-hack/testing/images/screenshot.png' });
        console.log('Screenshot taken.');

        return pTagsContent;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the browser if it is open
        if (browser) {
            await browser.close();
        }
    }
};
