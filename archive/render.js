const { bundle } = require("@remotion/bundler");
const { renderMedia, selectComposition } = require("@remotion/renderer");
const path = require("path");

const start = async () => {
  const bundled = await bundle({
    entryPoint: path.resolve("./src/index.tsx"),
    webpackOverride: (config) => config,
  });

  const composition = await selectComposition({
    serveUrl: bundled,
    id: "GhostSignalChat",
  });

  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: `out/ghost-signal.mp4`,
    chromiumOptions: {
      disableWebSecurity: true,
    },
  });

  console.log("Render done!");
};

start();