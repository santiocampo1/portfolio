import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
    Background, Controls, Handle, Position,
    useNodesState, useEdgesState, MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const mono = { fontFamily: "'DM Mono', monospace" };

const COLORS = {
    client: "#1D4ED8",
    frontend: "#1D4ED8",
    infra: "#94A3B8",
    db: "#7C3AED",
    edge: "#0D9488",
    external: "#F59E0B",
};

function CustomNode({ data }) {
    return (
        <div
            style={{
                padding: "9px 13px",
                borderRadius: "8px",
                border: `1.5px solid ${data.color}`,
                background: "#fff",
                minWidth: 148,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
            }}
        >
            <Handle type="target" position={Position.Top} style={{ background: data.color, width: 6, height: 6 }} />
            <Handle type="target" position={Position.Left} style={{ background: data.color, width: 6, height: 6 }} />
            <p style={{ ...sans, fontWeight: 700, fontSize: "0.76rem", color: "var(--text)", marginBottom: "2px" }}>
                {data.label}
            </p>
            <p style={{ ...mono, fontSize: "0.54rem", color: data.color, letterSpacing: "0.02em", lineHeight: 1.3 }}>
                {data.sub}
            </p>
            <Handle type="source" position={Position.Bottom} style={{ background: data.color, width: 6, height: 6 }} />
            <Handle type="source" position={Position.Right} style={{ background: data.color, width: 6, height: 6 }} />
        </div>
    );
}

const nodeTypes = { custom: CustomNode };

function buildNodes(n) {
    const mk = (id, key, x, y, color) => ({
        id, type: "custom", position: { x, y },
        data: { label: n[key].label, sub: n[key].sub, detail: n[key].detail, color },
    });
    return [
        mk("visitor", "visitor", 380, 0, COLORS.client),
        mk("frontend", "frontend", 380, 110, COLORS.frontend),
        mk("vercel", "vercel", 660, 110, COLORS.infra),
        mk("openlibrary", "openlibrary", 60, 230, COLORS.external),
        mk("supabaseRest", "supabaseRest", 380, 230, COLORS.db),
        mk("youtube", "youtube", 640, 230, COLORS.external),
        mk("globe3d", "globe3d", 880, 230, COLORS.frontend),
        mk("postgres", "postgres", 300, 360, COLORS.db),
        mk("chatSimon", "chatSimon", 560, 360, COLORS.edge),
        mk("claude", "claude", 560, 480, COLORS.external),
        mk("webhook", "webhook", 300, 480, COLORS.db),
        mk("notifyFn", "notifyFn", 300, 600, COLORS.edge),
        mk("resend", "resend", 300, 720, COLORS.external),
    ];
}

function buildEdges(ed) {
    const labelStyle = { ...mono, fontSize: "0.56rem", fill: "var(--text-4)" };
    const e = (id, source, target, label, color, sourceHandle, targetHandle) => ({
        id, source, target, label, sourceHandle, targetHandle,
        style: { stroke: color, strokeWidth: 1.4 },
        labelStyle, labelBgStyle: { fill: "#fff", fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color, width: 14, height: 14 },
    });
    return [
        e("e1", "visitor", "frontend", ed.load, COLORS.client),
        e("e2", "frontend", "vercel", ed.hosts, COLORS.infra, "right", "left"),
        e("e3", "frontend", "openlibrary", ed.covers, COLORS.external, "left", "top"),
        e("e4", "frontend", "supabaseRest", ed.io, COLORS.db),
        e("e5", "frontend", "youtube", ed.iframe, COLORS.external, "right", "top"),
        e("e6", "frontend", "globe3d", ed.renders, COLORS.frontend, "right", "top"),
        e("e7", "frontend", "chatSimon", ed.post, COLORS.edge, "right", "top"),
        e("e8", "supabaseRest", "postgres", ed.crud, COLORS.db),
        e("e9", "chatSimon", "supabaseRest", ed.booksLog, COLORS.edge, "left", "right"),
        e("e10", "chatSimon", "claude", ed.api, COLORS.external),
        e("e11", "postgres", "webhook", ed.insert, COLORS.db),
        e("e12", "webhook", "notifyFn", ed.trigger, COLORS.edge),
        e("e13", "notifyFn", "resend", ed.email, COLORS.external),
    ];
}

export default function ArchitectureDiagram({ content }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setNodes(buildNodes(content.nodes));
        setEdges(buildEdges(content.edges));
        setSelected(null);
    }, [content, setNodes, setEdges]);

    const onNodeClick = useCallback((_, node) => {
        const key = Object.keys(content.nodes).find(k => content.nodes[k].label === node.data.label);
        setSelected(content.nodes[key]);
    }, [content]);

    return (
        <div>
            <p style={{ ...mono, fontSize: "0.62rem", color: "var(--text-3)", letterSpacing: "0.03em", marginBottom: "0.75rem" }}>
                {content.hint}
            </p>
            <div style={{
                height: 520, borderRadius: "10px", border: "1px solid var(--border)",
                overflow: "hidden", background: "var(--bg-subtle)",
            }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onNodeClick={onNodeClick}
                    fitView
                    fitViewOptions={{ padding: 0.15 }}
                    zoomOnScroll={false}
                    panOnScroll={false}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background color="var(--border)" gap={18} size={1} />
                    <Controls showInteractive={false} />
                </ReactFlow>
            </div>
            <div style={{
                marginTop: "0.85rem", minHeight: 64,
                padding: "0.85rem 1rem",
                border: "1px solid var(--border)", borderRadius: "8px",
                background: "var(--bg-subtle)",
            }}>
                {selected ? (
                    <>
                        <p style={{ ...sans, fontWeight: 700, fontSize: "0.82rem", color: "var(--text)", marginBottom: "3px" }}>
                            {selected.label}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "var(--text-3)", lineHeight: 1.55 }}>
                            {selected.detail}
                        </p>
                    </>
                ) : (
                    <p style={{ ...mono, fontSize: "0.62rem", color: "var(--text-4)" }}>
                        {content.waiting}
                    </p>
                )}
            </div>
        </div>
    );
}