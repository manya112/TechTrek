import React, { useEffect, useRef, useState } from 'react';

const Dataanyalyst = () => {
  const paperRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set initial progress after component mounts
    setTimeout(() => {
      setProgress(6); // Example progress
    }, 300);

    // Only execute if JointJS dependencies are available in the global scope
    if (window.joint) {
      const { dia, shapes } = window.joint;
      
      // Create a new JointJS graph
      const graph = new dia.Graph();

      // Create a paper to render the graph with automatic fitting
      const paper = new dia.Paper({
        el: paperRef.current,
        model: graph,
        width: '100%',
        height: '100%',
        gridSize: 1,
        background: { color: 'transparent' },
        interactive: false,
        drawGrid: false,
        fitToContent: {
          padding: 50,
          minWidth: 800,
          minHeight: 1500,
        },
      });

      // Helper function to create boxes with appropriate colors
      function createBox(text, x, y, isMainNode) {
        const width =
          text.length > 25
            ? 210
            : text.length > 20
            ? 190
            : text.length > 15
            ? 170
            : 130;

        const box = new shapes.standard.Rectangle({
          position: { x: x - width / 2, y: y },
          size: { width: width, height: 35 },
          attrs: {
            body: {
              fill: isMainNode ? "#2c3e50" : "#b0c4de",
              stroke: "#333333",
              "stroke-width": 1,
              rx: 2,
              ry: 2,
            },
            label: {
              text: text,
              "font-size": 12,
              "font-weight": isMainNode ? "bold" : "normal",
              "font-family": "Inter, Arial, sans-serif",
              fill: "#111",
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
                stroke: "#2c3e50",
                "stroke-width": 2,
                "stroke-dasharray": "5,5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
              },
            }
          : {
              line: {
                stroke: "#2c3e50",
                "stroke-width": 2,
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
              },
            };
        const link = new shapes.standard.Link({
          source: { id: source.id },
          target: { id: target.id },
          attrs: style,
          router: { name: "manhattan", args: { padding: 10 } },
          connector: { name: "rounded", args: { radius: 5 } },
        });

        graph.addCell(link);
        return link;
      }

      // Main Nodes
      const Dataanyalyst = createBox("AI Engineer Development", 500, 70, true);
      const foundations = createBox("Programming Foundations", 500, 160, true);
      const languages = createBox("Programming Languages", 400, 320, true);
      const serverSide = createBox("Server-Side Frameworks", 500, 270, true);
      const databases = createBox("Databases", 500, 440, true);
      const apiDesign = createBox("API Design", 350, 520, true);
      const authentication = createBox("Authentication", 650, 520, true);
      const cloudServices = createBox("Cloud Services", 650, 600, true);
      const architectures = createBox("System Design", 500, 720, true);
      const performance = createBox("Performance Optimization", 280, 780, true);
      const security = createBox("Security Practices", 400, 1100, true);
      const devops = createBox("DevOps", 700, 880, true);
      const deployment = createBox("Deployment Strategies", 700, 1150, true);

      // Foundational Nodes
      const computerScience = createBox("Computer Science Basics", 170, 80, false);
      const dataStructures = createBox("Data Structures", 170, 120, false);
      const algorithms = createBox("Algorithms", 170, 160, false);
      const networkConcepts = createBox("Network Concepts", 170, 200, false);
      const osTheory = createBox("Operating Systems", 170, 240, false);

      // Language Nodes
      const python = createBox("Python", 800, 80, false);
      const java = createBox("Java", 800, 120, false);
      const javascript = createBox("JavaScript", 800, 160, false);
      const golang = createBox("Go", 800, 200, false);
      const rust = createBox("Rust", 800, 240, false);
      const csharp = createBox("C#", 800, 280, false);

      // Server-Side Framework Nodes
      const django = createBox("Django", 170, 280, false);
      const flask = createBox("Flask", 170, 320, false);
      const springBoot = createBox("Spring Boot", 170, 360, false);
      const expressJS = createBox("Express.js", 170, 400, false);
      const fastAPI = createBox("FastAPI", 170, 440, false);
      const nestJS = createBox("Nest.js", 170, 480, false);

      // Database Nodes
      const mysql = createBox("MySQL", 800, 360, false);
      const postgresql = createBox("PostgreSQL", 800, 400, false);
      const mongodb = createBox("MongoDB", 800, 440, false);
      const redis = createBox("Redis", 800, 480, false);
      const cassandra = createBox("Cassandra", 800, 520, false);

      // API Design Nodes
      const restful = createBox("RESTful API", 350, 560, false);
      const graphql = createBox("GraphQL", 350, 600, false);
      const openAPI = createBox("OpenAPI/Swagger", 350, 640, false);
      const grpc = createBox("gRPC", 350, 680, false);

      // Authentication Nodes
      const jwt = createBox("JWT", 800, 560, false);
      const oauth = createBox("OAuth", 800, 600, false);
      const saml = createBox("SAML", 800, 640, false);
      const keycloak = createBox("Keycloak", 800, 680, false);

      // Cloud Services Nodes
      const aws = createBox("AWS", 800, 720, false);
      const azure = createBox("Azure", 800, 760, false);
      const gcp = createBox("Google Cloud", 800, 800, false);
      const digitalOcean = createBox("DigitalOcean", 800, 840, false);

      // System Design Nodes
      const microservices = createBox("Microservices", 150, 830, false);
      const eventDriven = createBox("Event-Driven Arch", 150, 870, false);
      const serverless = createBox("Serverless", 150, 910, false);

      // Performance Optimization Nodes
      const caching = createBox("Caching", 150, 980, false);
      const loadBalancing = createBox("Load Balancing", 150, 1020, false);
      const dbOptimization = createBox("DB Optimization", 150, 1060, false);

      // Security Practices Nodes
      const encryption = createBox("Encryption", 150, 1130, false);
      const inputValidation = createBox("Input Validation", 150, 1170, false);
      const secureComms = createBox("Secure Communications", 150, 1210, false);

      // DevOps Nodes
      const docker = createBox("Docker", 600, 930, false);
      const kubernetes = createBox("Kubernetes", 800, 930, false);
      const cicd = createBox("CI/CD", 800, 970, false);
      const monitoring = createBox("Monitoring", 600, 970, false);

      // Deployment Nodes
      const containerDeploy = createBox("Container Deployment", 600, 1030, false);
      const serverDeploy = createBox("Server Deployment", 800, 1030, false);
      const cloudDeploy = createBox("Cloud Deployment", 700, 1070, false);

      // Add all elements to the graph
      graph.addCells([
        // Main Nodes
        Dataanyalyst,
        foundations,
        languages,
        serverSide,
        databases,
        apiDesign,
        authentication,
        cloudServices,
        architectures,
        performance,
        security,
        devops,
        deployment,

        // Foundational Nodes
        computerScience,
        dataStructures,
        algorithms,
        networkConcepts,
        osTheory,

        // Language Nodes
        python,
        java,
        javascript,
        golang,
        rust,
        csharp,

        // Server-Side Framework Nodes
        django,
        flask,
        springBoot,
        expressJS,
        fastAPI,
        nestJS,

        // Database Nodes
        mysql,
        postgresql,
        mongodb,
        redis,
        cassandra,

        // API Design Nodes
        restful,
        graphql,
        openAPI,
        grpc,

        // Authentication Nodes
        jwt,
        oauth,
        saml,
        keycloak,

        // Cloud Services Nodes
        aws,
        azure,
        gcp,
        digitalOcean,

        // System Design Nodes
        microservices,
        eventDriven,
        serverless,

        // Performance Optimization Nodes
        caching,
        loadBalancing,
        dbOptimization,

        // Security Practices Nodes
        encryption,
        inputValidation,
        secureComms,

        // DevOps Nodes
        docker,
        kubernetes,
        cicd,
        monitoring,

        // Deployment Nodes
        containerDeploy,
        serverDeploy,
        cloudDeploy,
      ]);

      // Create main connections (solid lines)
      createLink(Dataanyalyst, foundations, false);
      createLink(foundations, languages, false);
      createLink(foundations, serverSide, false);
      createLink(serverSide, databases, false);
      createLink(databases, apiDesign, false);
      createLink(apiDesign, authentication, false);
      createLink(authentication, cloudServices, false);
      createLink(cloudServices, architectures, false);
      createLink(architectures, performance, false);
      createLink(performance, security, false);
      createLink(security, devops, false);
      createLink(devops, deployment, false);

      // Create dotted connections for Foundations
      createLink(foundations, computerScience, true);
      createLink(foundations, dataStructures, true);
      createLink(foundations, algorithms, true);
      createLink(foundations, networkConcepts, true);
      createLink(foundations, osTheory, true);

      // Language Connections
      createLink(languages, python, true);
      createLink(languages, java, true);
      createLink(languages, javascript, true);
      createLink(languages, golang, true);
      createLink(languages, rust, true);
      createLink(languages, csharp, true);

      // Server-Side Framework Connections
      createLink(serverSide, django, true);
      createLink(serverSide, flask, true);
      createLink(serverSide, springBoot, true);
      createLink(serverSide, expressJS, true);
      createLink(serverSide, fastAPI, true);
      createLink(serverSide, nestJS, true);

      // Database Connections
      createLink(databases, mysql, true);
      createLink(databases, postgresql, true);
      createLink(databases, mongodb, true);
      createLink(databases, redis, true);
      createLink(databases, cassandra, true);

      // API Design Connections
      createLink(apiDesign, restful, true);
      createLink(apiDesign, graphql, true);
      createLink(apiDesign, openAPI, true);
      createLink(apiDesign, grpc, true);

      // Authentication Connections
      createLink(authentication, jwt, true);
      createLink(authentication, oauth, true);
      createLink(authentication, saml, true);
      createLink(authentication, keycloak, true);

      // Cloud Services Connections
      createLink(cloudServices, aws, true);
      createLink(cloudServices, azure, true);
      createLink(cloudServices, gcp, true);
      createLink(cloudServices, digitalOcean, true);

      // System Design Connections
      createLink(architectures, microservices, true);
      createLink(architectures, eventDriven, true);
      createLink(architectures, serverless, true);

      // Performance Optimization Connections
      createLink(performance, caching, true);
      createLink(performance, loadBalancing, true);
      createLink(performance, dbOptimization, true);

      // Security Practices Connections
      createLink(security, encryption, true);
      createLink(security, inputValidation, true);
      createLink(security, secureComms, true);

      // DevOps Connections
      createLink(devops, docker, true);
      createLink(devops, kubernetes, true);
      createLink(devops, cicd, true);
      createLink(devops, monitoring, true);

      // Deployment Connections
      createLink(deployment, containerDeploy, true);
      createLink(deployment, serverDeploy, true);
      createLink(deployment, cloudDeploy, true);

      // Fit content after all elements are added
      paper.fitToContent({
        padding: 50,
        minWidth: 800,
        minHeight: 1500,
      });
    }
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 py-16 text-center text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">AI Engineer Developer Roadmap 2025</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            A comprehensive step-by-step guide to becoming a modern AI Engineer
            developer with the latest technologies and best practices
          </p>

          <div className="flex justify-center gap-5">
            <a href="#" className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-30 transition-all">
              Interactive Roadmap
            </a>
            <a href="#" className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-30 transition-all">
              Learning Resources
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto -mt-8 relative z-20 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Your Progress</span>
          <span className="font-bold text-gray-800">0/100 Completed</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-gray-800 to-gray-700 h-full rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow max-w-3xl mx-auto my-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 rounded-full bg-gray-800"></div>
          <div>Personal Recommendation / Core Path</div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-4 h-4 rounded-full bg-green-600"></div>
          <div>Alternative Option / Recommended</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-gray-400"></div>
          <div>Flexible Learning / Optional</div>
        </div>
      </div>

      <div className="relative w-11/12 max-w-5xl h-[1500px] mx-auto my-10 bg-white rounded-xl shadow-md overflow-hidden">
        <div ref={paperRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"></div>
       
        <div className="flowchart">
        <div id="paper" ref={paperRef}></div>
        <div className="w-full h-[1600vh] bg-white">
      <iframe
        className="w-full h-full bg-white"
        src="/ai-engineer.pdf#toolbar=0"
        type="application/pdf"
      />
    </div>
      </div>
      </div>

      <footer className="bg-gray-800 text-white py-10 text-center mt-10">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4">AI Engineer Developer Roadmap</h3>
          <p className="text-gray-400 mb-5">
            This roadmap aims to provide a comprehensive understanding of the
            AI Engineer development landscape and guide you through the skills and
            technologies needed to become a modern AI Engineer developer.
          </p>
          <div className="flex justify-center gap-8 mt-5">
            <a href="#" className="text-blue-400 hover:underline">Resources</a>
            <a href="#" className="text-blue-400 hover:underline">Community</a>
            <a href="#" className="text-blue-400 hover:underline">Contribute</a>
            <a href="#" className="text-blue-400 hover:underline">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dataanyalyst;