import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export default function Markdown({ children }: { children: string }) {
  return (
    <article
      className={[
        "prose prose-invert max-w-none",
        "prose-headings:font-medium prose-headings:text-white",
        "prose-h2:scroll-mt-24 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3",
        "prose-a:text-violet-300 hover:prose-a:text-violet-200",
        "prose-strong:text-white",
        "prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-rose-200",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:border prose-pre:border-[#292932] prose-pre:bg-[#0e0e13]",
        "prose-th:text-white prose-td:text-white/70",
      ].join(" ")}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
        {children}
      </ReactMarkdown>
    </article>
  );
}
