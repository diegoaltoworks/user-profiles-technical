import { MarkdownToHTML } from "~/components/MarkdownToHTML";

export default function TodoPage() {
  return (
    <main className="prose" data-testid="page-body">
      <h2 data-testid="page-title" role="heading" aria-level={1}>
        To-Do
      </h2>
      <article data-testid="page-copy">
        {process.env.NEXT_PUBLIC_GITHUB_USERNAME ? (
          <MarkdownToHTML
            url={`https://raw.githubusercontent.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/user-profiles-technical/main/TODO.md`}
          />
        ) : (
          <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded">
            Missing GitHub username
          </div>
        )}
      </article>
    </main>
  );
}
