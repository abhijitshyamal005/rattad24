import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const sections = [
  {
    id: 1,
    title: '1. Ideation: Ideate at Lightning Speed',
    content: (
      <div className="flex flex-col px-5 ">
        <p className="text-sm leading-5 ">
          Jumpstart your creativity with simplecx's AI-powered Brainstorming
          Box. Share your idea, goal, or product keywords, and simplecx
          instantly generates tailored, professional content for social media,
          blogs, or campaigns-keeping your input front and center.
        </p>
        <ul className="list-disc ml-4 mt-2 text-xs leading-5 space-y-3">
          <li>
            Input Parameters: Add your brand guidelines, goals, and audience
            details using text, image, or voice.
          </li>
          <li>
            Generate Ideas Instantly: Receive concepts, outlines, and strategies
            in seconds.
          </li>
          <li>
            Adapt Across Formats: Create content for blogs, social media, or
            presentations effortlessly.
          </li>
          <li>
            Keep It Fresh: Get real-time, data-backed suggestions aligned with
            your brand tone and audience needs.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: '2. Creation: Bring Content to Life',
    content: (
      <div>
        <p className="text-sm leading-5">
          Launch your content creation process effortlessly with simplecx. A
          single prompt is all you need- just input your idea or topic, and
          simplecx transforms it into high-quality, on-brand content for any
          platform.
        </p>
        <ul className="list-disc ml-4 mt-2 text-xs leading-5">
          <li>
            Effortless Input: Start with a simple idea, and simplecx crafts
            structured, multimodal content with no extra effort.
          </li>
          <li>
            Versatile Output: Generate blog posts, social media captions,
            product descriptions, and presentations, all tailored to your needs.
          </li>
          <li>
            Time-Saving Efficiency: Say goodbye to juggling multiple platforms;
            simplecx keeps everything in one place, saving time and maintaining
            quality.
          </li>
          <li>
            Multichannel Creation: Easily create cohesive content for emails,
            ads, blogs, and more.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    title: '3. Modification: Tailor Content Seamlessly',
    content: (
      <div>
        <p className="text-sm leading-5">
          simplecx makes it effortless to adapt your content to fit your brand
          and resonate with your target audience. Whether you’re addressing
          specific demographics, industries, or global markets, simplecx ensures
          your message connects and engages effectively.
        </p>

        <ul className="list-disc ml-4 mt-2 text-xs leading-5">
          <li>
            Effortless Customisation: Fine-tune tone, style, and messaging to
            align perfectly with your brand voice.
          </li>
          <li>
            Targeted Messaging: Personalise content to cater to specific
            audiences, industries, or regions.
          </li>
          <li>
            Localised Content: Adapt language and cultural nuances to connect
            authentically with international markets.
          </li>
          <li>
            Core Value Retention: Keep your message’s essence intact while
            tailoring it for maximum impact.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    title: '4. Promotion: Share Your Content Seamlessly',
    content: (
      <div>
        <p className="text-sm leading-5">
          Promoting your content with simplecx is fast and effective. Once your
          content is created, simplecx provides tailored suggestions for
          optimisation, such as SEO keywords, trending tags, headlines, and
          visuals. You can then easily distribute your content across multiple
          channels, ensuring it’s on-brand and engaging for your target
          audience.
        </p>
        <ul className="list-disc ml-4 mt-2 text-xs leading-5">
          <li>
            Content Optimisation: simplecx recommends key adjustments for
            maximum reach.
          </li>
          <li>
            Multichannel Sharing: Publish on social media, blogs, email, and
            more with one click.
          </li>
          <li>
            Engagement Monitoring: Track performance and refine your strategy
            for better results.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 5,
    title: '5. Recommendation: Stay Consistent with simplecx ',
    content: (
      <p className="text-sm leading-5">
        simplecx’s recommendation feature helps you maintain a consistent social
        media presence by guiding you through content review and optimisation.
        From boosting sign-ups to refining your content, simplecx ensures your
        messaging is on-brand and impactful, freeing you to focus on other
        crucial aspects of your business.
      </p>
    ),
  },
];

const Accordian = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="h-full  flex flex-col justify-between"
    >
      {sections.map((section, i) => (
        <AccordionItem key={i} className="border-none " value={`item-${i}`}>
          <AccordionTrigger className="font-moranga font-extralight text-[22px]  whitespace-nowrap">
            {section.title}
          </AccordionTrigger>
          <AccordionContent className="bg-[#121212] p-[20px] text-[14px] brightness-90 font-inter font-extralight rounded-[30px] my-4">
            {section.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

  );
};

export default Accordian;