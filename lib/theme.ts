export const theme = {
  maxChars: 2000,
  ws: () => {
    const host =
      process.env.NEXT_PUBLIC_WS_HOST || process.env.WS_HOST || "localhost";
    const port =
      process.env.NEXT_PUBLIC_WS_PORT || process.env.WS_PORT || "8080";
    const secure =
      (process.env.NEXT_PUBLIC_WS_SECURE || process.env.WS_SECURE) === "true";
    const proto = secure ? "wss" : "ws";
    return `${proto}://${host}:${port}`;
  },
};
