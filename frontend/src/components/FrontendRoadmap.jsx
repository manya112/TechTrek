import { useEffect, useRef, useState } from 'react';

const FrontendRoadmap = () => {
  const paperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Set initial progress with a delay
    const progressTimer = setTimeout(() => {
      setProgress(8);
    }, 300);

    // Only run JointJS code if it's available in the window
    if (window.joint && paperRef.current) {
      initializeJointJS();
    }
    
    return () => clearTimeout(progressTimer);
  }, []);

  // Initialize JointJS graph and paper
  const initializeJointJS = () => {
    const { joint } = window;
    // Create a new JointJS graph
    const graph = new joint.dia.Graph();

    // Create a paper to render the graph with automatic fitting
    const paper = new joint.dia.Paper({
      el: paperRef.current,
      model: graph,
      width: "100%",
      height: "100%",
      gridSize: 1,
      background: { color: "transparent" },
      interactive: false,
      drawGrid: false,
      fitToContent: {
        padding: 50,
        minWidth: 800,
        minHeight: 1000,
        
      },
    });

    // Helper function to create boxes
    function createBox(text, x, y, isMainNode) {
      const width =
        text.length > 25
          ? 210
          : text.length > 20
          ? 190
          : text.length > 15
          ? 170
          : 130;

      const box = new joint.shapes.standard.Rectangle({
        position: { x: x - width / 2, y: y },
        size: { width: width, height: 35 },
        attrs: {
          body: {
            fill: isMainNode ? "#8f8ac7" : "#d4d0ff",
            stroke: "#333333",
            "stroke-width": 1,
            rx: 2,
            ry: 2,
          },
          label: {
            text: text,
            "font-size": 14,
            "font-weight": isMainNode ? "bold" : "normal",
            "font-family": "Inter, Arial, sans-serif",
            fill: "#333",
          },
        },
      });

      return box;
    }

    // Helper function to create links
    function createLink(source, target, isDotted) {
      const style = isDotted 
        ? {
            line: {
              stroke: "#4361ee",
              "stroke-width": 2,
              "stroke-dasharray": "5,5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            },
          } 
        : {
            line: {
              stroke: "#4361ee",
              "stroke-width": 3,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            },
          };

      const link = new joint.shapes.standard.Link({
        source: { id: source.id },
        target: { id: target.id },
        attrs: style,
        router: { name: "manhattan", args: { padding: 10 } },
        connector: { name: "rounded", args: { radius: 5 } },
      });

      graph.addCell(link);
      return link;
    }

    // Create all the boxes for the roadmap
    const frontend = createBox("Front-end", 500, 70, true);
    const internet = createBox("Internet", 500, 160, true);
    const html = createBox("HTML", 170, 320, false);
    const css = createBox("CSS", 500, 270, true);
    const javascript = createBox("JavaScript", 500, 440, true);
    const vcs = createBox("Version Control Systems", 350, 520, true);
    const vcsHosting = createBox("VCS Hosting", 650, 520, true);
    const packageManagers = createBox("Package Managers", 650, 600, true);
    const framework = createBox("Pick a Framework", 500, 720, true);
    const writingCss = createBox("Writing CSS", 280, 780, true);
    const cssArchitecture = createBox("CSS Architecture", 280, 880, true);
    const cssPreprocessors = createBox("CSS Preprocessors", 700, 880, true);

    // Internet left side boxes
    const learnBasics = createBox("Learn the basics", 170, 80, false);
    const semanticHtml = createBox("Writing Semantic HTML", 170, 120, false);
    const forms = createBox("Forms and Validations", 170, 160, false);
    const accessibility = createBox("Accessibility", 170, 200, false);
    const seo = createBox("SEO Basics", 170, 240, false);

    // Internet right side boxes
    const internetWork = createBox("How does the internet work?", 800, 80, false);
    const http = createBox("What is HTTP?", 800, 120, false);
    const domain = createBox("What is Domain Name?", 800, 160, false);
    const hosting = createBox("What is hosting?", 800, 200, false);
    const dns = createBox("DNS and how it works?", 800, 240, false);
    const browsers = createBox("Browsers and how they work?", 800, 280, false);

    // HTML related boxes
    const htmlBasics = createBox("Learn the Basics", 170, 280, false);
    const dom = createBox("Learn DOM Manipulation", 170, 360, false);
    const fetch = createBox("Fetch API / Ajax (XHR)", 170, 400, false);

    // CSS related boxes
    const cssBasics = createBox("Learn the basics", 500, 320, false);
    const layouts = createBox("Making Layouts", 500, 360, false);
    const responsive = createBox("Responsive Design", 500, 400, false);

    // VCS related boxes
    const git = createBox("Git", 350, 560, false);

    // VCS hosting related boxes
    const github = createBox("GitHub", 800, 360, false);
    const gitlab = createBox("GitLab", 800, 400, false);
    const bitbucket = createBox("Bitbucket", 800, 440, false);

    // Package manager boxes
    const npm = createBox("npm", 400, 600, false);
    const pnpm = createBox("pnpm", 400, 640, false);
    const yarn = createBox("yarn", 400, 680, false);

    // Framework boxes
    const react = createBox("React", 800, 520, false);
    const vue = createBox("Vue.js", 800, 560, false);
    const angular = createBox("Angular", 800, 600, false);
    const svelte = createBox("Svelte", 800, 640, false);
    const solid = createBox("Solid JS", 800, 680, false);
    const qwik = createBox("Qwik", 800, 720, false);

    // Writing CSS related
    const tailwind = createBox("Tailwind", 150, 830, false);

    // CSS Architecture related
    const bem = createBox("BEM", 150, 930, false);

    // CSS Preprocessors related
    const sass = createBox("Sass", 600, 930, false);
    const postcss = createBox("PostCSS", 800, 930, false);

    // Add all elements to the graph
    graph.addCells([
      frontend, internet, html, css, javascript, vcs, vcsHosting,
      packageManagers, framework, writingCss, cssArchitecture, cssPreprocessors,
      learnBasics, semanticHtml, forms, accessibility, seo,
      internetWork, http, domain, hosting, dns, browsers,
      htmlBasics, dom, fetch, cssBasics, layouts, responsive,
      github, gitlab, bitbucket, git, npm, pnpm, yarn,
      react, vue, angular, svelte, solid, qwik,
      tailwind, bem, sass, postcss,
    ]);

    // Create main connections (solid lines)
    createLink(frontend, internet, false);
    createLink(internet, css, false);
    createLink(internet, html, false);
    createLink(css, javascript, false);
    createLink(html, javascript, false);
    createLink(javascript, vcs, false);
    createLink(vcs, vcsHosting, false);
    createLink(vcsHosting, packageManagers, false);
    createLink(packageManagers, framework, false);
    createLink(framework, writingCss, false);
    createLink(writingCss, cssArchitecture, false);
    createLink(cssArchitecture, cssPreprocessors, false);

    // Create dotted connections
    createLink(internet, learnBasics, true);
    createLink(internet, semanticHtml, true);
    createLink(internet, forms, true);
    createLink(internet, accessibility, true);
    createLink(internet, seo, true);

    createLink(internet, internetWork, true);
    createLink(internet, http, true);
    createLink(internet, domain, true);
    createLink(internet, hosting, true);
    createLink(internet, dns, true);
    createLink(internet, browsers, true);

    createLink(html, htmlBasics, true);
    createLink(html, dom, true);
    createLink(html, fetch, true);

    createLink(css, cssBasics, true);
    createLink(css, layouts, true);
    createLink(css, responsive, true);

    createLink(vcsHosting, github, true);
    createLink(vcsHosting, gitlab, true);
    createLink(vcsHosting, bitbucket, true);

    createLink(vcs, git, true);

    createLink(packageManagers, npm, true);
    createLink(packageManagers, pnpm, true);
    createLink(packageManagers, yarn, true);

    createLink(framework, react, true);
    createLink(framework, vue, true);
    createLink(framework, angular, true);
    createLink(framework, svelte, true);
    createLink(framework, solid, true);
    createLink(framework, qwik, true);

    createLink(writingCss, tailwind, true);
    createLink(cssArchitecture, bem, true);

    createLink(cssPreprocessors, sass, true);
    createLink(cssPreprocessors, postcss, true);

    // Fit content after all elements are added
    paper.fitToContent({
      padding: 50,
      minWidth: 800,
      minHeight: 1000,
    });
  };

  // Handle accordion click
  const handleAccordionClick = (e) => {
    const chevron = e.currentTarget.querySelector(".chevron");
    if (chevron) {
      chevron.style.transform =
        chevron.style.transform === "rotate(225deg)"
          ? "rotate(45deg)"
          : "rotate(225deg)";
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Frontend Developer Roadmap 2025</h1>
        <p className="subtitle">
          A comprehensive step-by-step guide to becoming a modern frontend
          developer with the latest technologies and best practices
        </p>

        <div className="button-container">
          <a href="./frontend.html" className="button">
            <i className="fa fa-map-marker"></i>
            Interactive Roadmap
          </a>
        
          <a href="./project1.html" className="button">
            <i className="fa fa-wrench"></i>
            Project Ideas
          </a>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-header">
          <span className="progress-text">Your Progress</span>
          <span className="progress-count">0/100 Completed</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="h-[700vh] w-full">
        {/* <div id="paper" ref={paperRef}></div> */}
        {/* <div className="w-full h-[500vh] bg-white"> */}
      <iframe
        className="w-full h-full bg-white"
        src="/frontend.pdf#toolbar=0"
        type="application/pdf"
      />
    {/* </div> */}
      </div>

      <footer>
        <div className="footer-content">
          <h3 className="footer-title">Frontend Developer Roadmap</h3>
          <p className="footer-description">
            This roadmap aims to give you a comprehensive understanding of the
            frontend development landscape and guide you through the tools and
            skills you need to become a modern frontend developer.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">Resources</a>
            <a href="#" className="footer-link">Community</a>
            <a href="#" className="footer-link">Contribute</a>
            <a href="#" className="footer-link">About</a>
          </div>
        </div>
      </footer>

    </>
  );
};

export default FrontendRoadmap;
