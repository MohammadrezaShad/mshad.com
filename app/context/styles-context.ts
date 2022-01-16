import { createContext } from "react";

export default createContext<{
  styles: React.ReactNode[];
  renderMode: "head" | "body" | "all";
}>({ styles: [], renderMode: "all" });
