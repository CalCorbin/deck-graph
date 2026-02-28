'use client';

import { MagicCard } from '@/app/components/features/MagicCard/MagicCard';
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
  const [scale, setScale] = useState(1);

  const handleZoom = (direction: 'in' | 'out') => {
    setScale((prevScale) => {
      const newScale = direction === 'in' ? prevScale * 1.2 : prevScale / 1.2;
      return Math.max(0.5, Math.min(newScale, 5));
    });
  };

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

    // Set dimensions
    const width = 800;
    const height = 600;

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
  }, [data, scale]);

  if (isLoading) return <div>Loading...</div>;

  if (!data) return null;

  return (
    <div>
      <h2>Network Graph</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleZoom('in')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Zoom In (+)
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Zoom Out (-)
          </button>
          <span className="px-4 py-2 text-gray-500">
            Zoom: {(scale * 100).toFixed(0)}%
          </span>
        </div>
        <div className="flex gap-6">
          <svg
            ref={svgRef}
            style={{
              border: '1px solid #ddd',
              width: '800px',
              height: '600px',
              overflow: 'hidden',
            }}
          />
          <table className="border-collapse border border-gray-300 w-max h-10">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  ID
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((card) => (
                <MagicCard key={card.id} name={card.name} id={card.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
