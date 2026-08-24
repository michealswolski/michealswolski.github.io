import { useCallback, useEffect, useState } from "react";

/*
  A ~40-line router instead of a routing library.

  The site has exactly two shapes of page — the home page and a case study —
  so pulling in react-router would add a dependency and a bundle for something
  this small. History API plus a popstate listener covers it.

  BASE handles the project-page path prefix if the site is ever served from a
  subdirectory; on the user/organisation Pages domain it's just "/".
*/

const BASE = import.meta.env.BASE_URL || "/";

export function projectPath(id) {
  return `${BASE}projects/${id}/`.replace(/\/{2,}/g, "/");
}

function parse(pathname) {
  const path = pathname.replace(/\/+$/, "");
  const base = BASE.replace(/\/+$/, "");
  const rest = base && path.startsWith(base) ? path.slice(base.length) : path;
  const match = /^\/projects\/([A-Za-z0-9-]+)$/.exec(rest);
  if (match) return { name: "project", id: match[1] };
  if (rest === "" || rest === "/") return { name: "home" };
  return { name: "notFound", path: rest };
}

export function useRoute() {
  const [route, setRoute] = useState(() =>
    typeof window === "undefined" ? { name: "home" } : parse(window.location.pathname)
  );

  useEffect(() => {
    const onPop = () => setRoute(parse(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    window.history[replace ? "replaceState" : "pushState"]({}, "", to);
    setRoute(parse(window.location.pathname));
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return [route, navigate];
}
