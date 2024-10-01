import { cleanEnv, str } from "envalid";
import Link from "next/link";
import IssuesPage from "./issues";
import TodoPage from "./todo";

const env = cleanEnv(process.env, {
  PROJECT_NAME: str(),
  PROJECT_VERSION: str(),
  NEXT_PUBLIC_API_HOST: str(),
});

export default function PrivacyPage() {
  return (
    <main className="prose" data-testid="page-body">
      <h1 data-testid="page-title" role="heading" aria-level={1}>
        Docs
      </h1>
      <p>These are auto-generated from the tRPC router specification</p>
      <div>
        <ul>
          <li>
            <Link href={`${env.NEXT_PUBLIC_API_HOST}/panel/`}>tRPC Panel</Link>
          </li>
          <li>
            <Link href={`${env.NEXT_PUBLIC_API_HOST}/openapi.json`}>
              RESTful openapi.json
            </Link>
            <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              draft!
            </span>
          </li>
          <li>
            <Link href={`${env.NEXT_PUBLIC_API_HOST}/docs/`}>
              RESTful API Docs
            </Link>
            <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              draft!
            </span>
            <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              and not implemented
            </span>
          </li>
        </ul>
      </div>
      <IssuesPage />
      <TodoPage />
    </main>
  );
}
