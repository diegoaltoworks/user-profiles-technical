import { TRPCQueryClient } from "~/utils/query-client";
import "./global.css";

export default function RootLayout({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCQueryClient>
          <div className="flex min-h-screen">
            <div className="flex flex-col flex-grow">
              <header className="bg-gray-800 text-white p-4">{header}</header>
              <main className="flex-grow p-4">{children}</main>
              <footer className="bg-gray-800 text-white p-4">{footer}</footer>
            </div>
          </div>
        </TRPCQueryClient>
      </body>
    </html>
  );
}
