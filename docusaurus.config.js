module.exports = {
  title: "Futebol de Robô",
  tagline: "Documentação do projeto",
    // URL of your site. For GitHub Pages use your user/org GitHub pages domain.
    url: "https://Kaian-Moura.github.io",
    // Base URL for your project. For project sites, set to '/<repoName>/'.
    baseUrl: "/futebolderobo/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
    // GitHub pages settings
    organizationName: "Kaian-Moura",
    projectName: "futebolderobo",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/", // serve docs at site root
          // editUrl can be set to your project's edit page (e.g. GitHub repo).
          // Leaving it undefined avoids validation errors when you don't want an edit link.
          editUrl: undefined,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
