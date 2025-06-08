"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
  apps: [
    {
      name: "Octagon-Uncle-Server",
      script: "./server.js", // Path to the compiled server script
      instances: 1,
      // --- Base Environment (can be overridden by env_*) ---
      env: {
        NODE_ENV: "production", // Default to production if not specified by env_*
      },
      // --- Development Environment Settings ---
      env_development: {
        NODE_ENV: "development",
        watch: true, // Enable watch in development
        ignore_watch: ["node_modules", "Logs", "bin"], // Ignore these directories when watching
        // You can also specify 'watch_delay' if needed
        // watch_delay: 1000, // Delay between change detection and restart (ms)
      },
      // --- Production Environment Settings ---
      env_production: {
        NODE_ENV: "production",
        watch: false, // Disable watch in production for stability
      },

      // Log file paths - can use env variables here if needed, but often fixed paths are fine
      log_file: "./Logs/server_combined.log",
      out_file: "./Logs/server_out.log",
      error_file: "./Logs/server_error.log",
      merge_logs: true,
    },
    {
      // Second application definition for the worker
      name: "Octagon-Uncle-Worker",
      script: "./Worker/MainWorker.js", // Path to the compiled worker script
      instances: 1,
      // --- Base Environment (can be overridden by env_*) ---
      env: {
        NODE_ENV: "production", // Default to production if not specified by env_*
      },
      // --- Development Environment Settings ---
      env_development: {
        NODE_ENV: "development",
        watch: true, // Enable watch in development
        ignore_watch: ["node_modules", "Logs", "bin"], // Ignore these directories when watching
        // watch_delay: 1000,
      },
      // --- Production Environment Settings ---
      env_production: {
        NODE_ENV: "production",
        watch: false, // Disable watch in production for stability
      },

      // Log file paths
      log_file: "./Logs/worker_combined.log",
      out_file: "./Logs/worker_out.log",
      error_file: "./Logs/worker_error.log",
      merge_logs: true,
    },
  ],
};
