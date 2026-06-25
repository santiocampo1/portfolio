import { useCallback, useEffect } from "react";
import ReactFlow, {
    Background, Controls, Handle, Position, NodeToolbar,
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

function DetailBubble({ detail, color, position }) {
    const arrowAtTop = position === Position.Bottom;
    return (
        <div style={{ position: "relative" }}>
            <div style={{
                maxWidth: 200,
                background: "#fff",
                border: `1.5px solid ${color}`,
                borderRadius: "8px",
                padding: "9px 11px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.14)",
                ...sans,
                fontSize: "0.7rem",
                lineHeight: 1.5,
                color: "var(--text-2)",
            }}>
                {detail}
            </div>
            <div style={{
                position: "absolute",
                left: "50%", transform: "translateX(-50%)",
                width: 0, height: 0,
                ...(arrowAtTop
                    ? { top: -6, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: `6px solid ${color}` }
                    : { bottom: -6, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `6px solid ${color}` }),
            }} />
        </div>
    );
}

function CustomNode({ data }) {
    return (
        <div
            style={{
                padding: "9px 13px",
                borderRadius: "8px",
                border: `1.5px solid ${data.color}`,
                background: "#fff",
                minWidth: 148,
                boxShadow: data.isSelected ? `0 0 0 3px ${data.color}33` : "0 2px 6px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
            }}
        >
            <NodeToolbar isVisible={data.isSelected} position={data.toolbarPosition} offset={10}>
                <DetailBubble detail={data.detail} color={data.color} position={data.toolbarPosition} />
            </NodeToolbar>

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
    const mk = (id, key, x, y, color, toolbarPosition = Position.Bottom) => ({
        id, type: "custom", position: { x, y },
        data: { label: n[key].label, sub: n[key].sub, detail: n[key].detail, color, isSelected: false, toolbarPosition },
    });
    return [
        mk("visitor", "visitor", 380, 0, COLORS.client),
        mk("frontend", "frontend", 380, 110, COLORS.frontend),
        mk("vercel", "vercel", 660, 110, COLORS.infra),
        mk("openlibrary", "openlibrary", 60, 230, COLORS.external),
        mk("supabaseRest", "supabaseRest", 380, 230, COLORS.db),
        mk("youtube", "youtube", 640, 230, COLORS.external),
        mk("globe3d", "globe3d", 880, 230, COLORS.frontend),
        mk("postgres", "postgres", 300, 360, COLORS.db, Position.Top),
        mk("chatSimon", "chatSimon", 560, 360, COLORS.edge, Position.Top),
        mk("claude", "claude", 560, 480, COLORS.external, Position.Top),
        mk("webhook", "webhook", 300, 480, COLORS.db, Position.Top),
        mk("notifyFn", "notifyFn", 300, 600, COLORS.edge, Position.Top),
        mk("resend", "resend", 300, 720, COLORS.external, Position.Top),
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

    useEffect(() => {
        setNodes(buildNodes(content.nodes));
        setEdges(buildEdges(content.edges));
    }, [content, setNodes, setEdges]);

    const onNodeClick = useCallback((_, clickedNode) => {
        setNodes(nds => nds.map(nd => ({
            ...nd,
            data: { ...nd.data, isSelected: nd.id === clickedNode.id ? !nd.data.isSelected : false },
        })));
    }, [setNodes]);

    const onPaneClick = useCallback(() => {
        setNodes(nds => nds.map(nd => ({ ...nd, data: { ...nd.data, isSelected: false } })));
    }, [setNodes]);

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
                    onPaneClick={onPaneClick}
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
        </div>
    );
}