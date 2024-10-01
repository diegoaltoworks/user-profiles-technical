import { cleanEnv, str } from "envalid";
import Link from "next/link";

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
            <Link href={`${env.NEXT_PUBLIC_API_HOST}/openapi.json`}>
              openapi.json
            </Link>
          </li>
          <li>
            <Link href={`${env.NEXT_PUBLIC_API_HOST}/docs/`}>
              tRPC API Docs
            </Link>
          </li>
          <li>
            <Link href={`${env.NEXT_PUBLIC_API_HOST}/panel/`}>tRPC Panel</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
