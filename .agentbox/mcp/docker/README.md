# Docker MCP Server

Provides MCP access to the host Docker engine using @0xshariq/docker-mcp-server.

## How it works

Agentbox mounts `/var/run/docker.sock` only when the Docker MCP is enabled.

The MCP server provides 24 Docker operations including:
- Container management (list, run, stop, remove, logs, exec)
- Image operations (list, pull, build, remove, prune)
- Network and volume management
- Docker Compose operations
- System operations (inspect, prune, login/logout)

## Usage

```bash
abox mcp add docker
```

If a container is already running, rebuild it so the socket mount is applied.

## Implementation Notes

This MCP uses a custom invocation command because the npm package's binary points to a CLI wrapper (which prints a banner) instead of the MCP server. The config invokes node directly on the dist/index.js entry point:

```json
"command": "node",
"args": ["/home/abox/.npm-global/lib/node_modules/@0xshariq/docker-mcp-server/dist/index.js"]
```

## Environment Variables

None required for Docker. If you need env vars for other MCPs, put them in
`.agentbox/.env` so Agentbox loads them automatically.
