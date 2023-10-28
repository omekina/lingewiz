console.log(await Bun.build({
    entrypoints: ["src/main.ts"],
    outdir: "www",
    minify: true,
}));
