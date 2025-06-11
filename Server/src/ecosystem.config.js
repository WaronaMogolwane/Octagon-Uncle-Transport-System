// src/ecosystem.config.js (MANUAL UPDATE REQUIRED FOR THESE PATHS AND env_file REFERENCES)
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
  apps: [
    {
      name: "Octagon-Uncle-Server",
      // CRITICAL FIX: Script path MUST be relative to the 'cwd' (bin/build/).
      // Change from "./src/server.js" to "./server.js"
      script: "./server.js",
      instances: 1,

      cwd: "./", // This is the root of the deployed artifact (bin/build/)

      env: {
        NODE_ENV: "development", // Default if no --env is specified
      },

      env_development: {
        NODE_ENV: "development",
        watch: true,
        ignore_watch: ["node_modules", "Logs", "bin", "src"],
        watch_options: { followSymlinks: false },
        // IMPORTANT: Point to .env.development specifically
        env_file: ".env.development",
        NODE_PATH: "C:\\OctagonUncle\\shared_node_modules", // **IMPORTANT:** Update this absolute path on your server
      },

      env_uat: {
        NODE_ENV: "uat",
        watch: false,
        // IMPORTANT: Point to .env.uat specifically
        env_file: ".env.uat",
        NODE_PATH: "C:\\OctagonUncle\\shared_node_modules", // **IMPORTANT:** Update this absolute path on your server
      },

      // Consistent with your `build:live` script and naming
      env_live: {
        NODE_ENV: "live",
        watch: false,
        // IMPORTANT: Point to .env.live specifically
        env_file: ".env.live",
        NODE_PATH: "C:\\OctagonUncle\\shared_node_modules", // **IMPORTANT:** Update this absolute path on your server
      },

      log_file: "./Logs/server_combined.log",
      out_file: "./Logs/server_out.log",
      error_file: "./Logs/server_error.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      max_memory_restart: "300M",
      exec_mode: "fork",
    },
    {
      name: "Octagon-Uncle-Worker",
      // CRITICAL FIX: Script path MUST be relative to the 'cwd' (bin/build/).
      // Change from "./src/Worker/MainWorker.js" to "./Worker/MainWorker.js"
      script: "./Worker/MainWorker.js",
      instances: 1,
      cwd: "./",

      env: {
        NODE_ENV: "development",
      },

      env_development: {
        NODE_ENV: "development",
        watch: true,
        ignore_watch: ["node_modules", "Logs", "bin", "src"],
        watch_options: { followSymlinks: false },
        env_file: ".env.development",
        NODE_PATH: "C:\\OctagonUncle\\shared_node_modules",
      },

      env_uat: {
        NODE_ENV: "uat",
        watch: false,
        env_file: ".env.uat",
        NODE_PATH: "C:\\OctagonUncle\\shared_node_modules",
      },

      // Consistent with your `build:live` script and naming
      env_live: {
        NODE_ENV: "live",
        watch: false,
        env_file: ".env.live",
        NODE_PATH: "C:\\OctagonUncle\\shared_node_modules",
      },

      log_file: "./Logs/worker_combined.log",
      out_file: "./Logs/worker_out.log",
      error_file: "./Logs/worker_error.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      max_memory_restart: "300M",
      exec_mode: "fork",
    },
  ],
};
