import { IconArrowRight } from "../components/Icons";

export default function NotFound({ path, onNavigateHome }) {
  return (
    <div className="notfound">
      <div className="container notfound-inner">
        <p className="eyebrow">404</p>
        <h1 className="notfound-title">This page doesn&rsquo;t exist</h1>
        <p className="notfound-sub">
          {path ? (
            <>
              Nothing lives at <code className="mono">{path}</code>. It may have been renamed, or the link may have been
              cut short.
            </>
          ) : (
            <>That link doesn&rsquo;t point anywhere on this site.</>
          )}
        </p>
        <a href={import.meta.env.BASE_URL || "/"} className="btn btn-primary" onClick={onNavigateHome}>
          Back to the portfolio
          <IconArrowRight />
        </a>
      </div>
    </div>
  );
}
