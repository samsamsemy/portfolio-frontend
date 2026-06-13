import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownFromRichText } from "@/lib/format";

type MarkdownRendererProps = {
  content: unknown;
  className?: string;
};

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const markdown = markdownFromRichText(content);

  if (!markdown) {
    return null;
  }

  return (
    <div className={`prose-free max-w-none text-sm leading-7 text-muted sm:text-base ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 list-decimal space-y-2 pl-5">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          a: ({ children, href }) =>
            href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-soft underline decoration-line underline-offset-4"
              >
                {children}
              </a>
            ) : (
              <>{children}</>
            ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
