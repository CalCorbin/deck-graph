'use client';

import { LoadingSpinner } from '@/app/components/ui/LoadingSpinner/LoadingSpinner';
import { mockDeck } from '@/app/components/ui/NetworkGraph/mockDeck';
import { useCards } from '@/hooks/useCards';
import * as d3 from 'd3';
import { Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { useEffect, useRef, useState } from 'react';

interface Node extends SimulationNodeDatum {
  id: string;
  label: string;
  imageUrl: string;
}

interface Link extends SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

export const NetworkGraph = () => {
  const { data, isLoading } = useCards(mockDeck);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const handleZoom = (direction: 'in' | 'out') => {
    setScale((prevScale) => {
      const newScale = direction === 'in' ? prevScale * 1.2 : prevScale / 1.2;
      return Math.max(0.5, Math.min(newScale, 5));
    });
  };

  // Update dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Map card data to nodes
    const nodes: Node[] = data.map((card) => ({
      id: card.id,
      label: card.name,
      imageUrl: card.image_uris?.small || '',
    }));

    // Create links between consecutive nodes (circular pattern)
    const links: Link[] = nodes.map((node, index) => ({
      source: node.id,
      target: nodes[(index + 1) % nodes.length].id,
    }));

    // Use dynamic dimensions
    const { width, height } = dimensions;

    // Create force simulation
    const simulation: Simulation<Node, Link> = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink<Node, Link>(links).id((d: Node) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Create a group for zooming
    const g = svg.append('g');

    // Create links
    const link = g
      .append('g')
      .selectAll<SVGLineElement, Link>('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create nodes
    const node = g
      .append('g')
      .selectAll<SVGImageElement, Node>('image')
      .data(nodes)
      .join('image')
      .attr('href', (d: Node) => d.imageUrl)
      .attr('width', 40)
      .attr('height', 56)
      .attr('x', (d: Node) => (d.x ?? 0) - 20)
      .attr('y', (d: Node) => (d.y ?? 0) - 28)
      .call(
        d3
          .drag<SVGImageElement, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: Link) => (d.source as Node).x ?? 0)
        .attr('y1', (d: Link) => (d.source as Node).y ?? 0)
        .attr('x2', (d: Link) => (d.target as Node).x ?? 0)
        .attr('y2', (d: Link) => (d.target as Node).y ?? 0);

      node
        .attr('x', (d: Node) => (d.x ?? 0) - 20)
        .attr('y', (d: Node) => (d.y ?? 0) - 28);
    });

    // Apply zoom transform
    g.attr('transform', `scale(${scale})`);
    g.style('transform-origin', '50% 50%');
    g.style('transition', 'transform 0.3s ease-in-out');

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, scale, dimensions]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden"
    >
      {/* Optional floating controls */}
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
        <h2 className="text-lg font-semibold mb-2">Network Graph</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleZoom('in')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zoom In
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Zoom Out
          </button>
        </div>
      </div>

      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #1a1a2e 100%)
          `,
        }}
      />
    </div>
  );
};
