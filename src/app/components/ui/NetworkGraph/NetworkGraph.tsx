'use client';

import { useCards } from '@/hooks/useCards';
import { MagicCard } from '@/app/components/features/MagicCard/MagicCard';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SimulationNodeDatum, SimulationLinkDatum, Simulation } from 'd3';

interface Node extends SimulationNodeDatum {
  id: string;
  label: string;
}

interface Link extends SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

export const NetworkGraph = () => {
  const [data] = useCards([
    'Cloud, Ex-SOLDIER',
    'Hexing Squelcher',
    'Bre of Clan Stoutarm',
    'Adept Watershaper',
  ]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Map card data to nodes
    const nodes: Node[] = data.map((card) => ({
      id: card.id,
      label: card.name,
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

    // Create links
    const link = svg
      .append('g')
      .selectAll<SVGLineElement, Link>('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create nodes
    const node = svg
      .append('g')
      .selectAll<SVGCircleElement, Node>('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', '#4F46E5')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    // Create labels
    const labels = svg
      .append('g')
      .selectAll<SVGTextElement, Node>('text')
      .data(nodes)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('font-size', '12px')
      .attr('fill', '#fff')
      .text((d: Node) => d.label);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: Link) => (d.source as Node).x ?? 0)
        .attr('y1', (d: Link) => (d.source as Node).y ?? 0)
        .attr('x2', (d: Link) => (d.target as Node).x ?? 0)
        .attr('y2', (d: Link) => (d.target as Node).y ?? 0);

      node.attr('cx', (d: Node) => d.x ?? 0).attr('cy', (d: Node) => d.y ?? 0);

      labels.attr('x', (d: Node) => d.x ?? 0).attr('y', (d: Node) => d.y ?? 0);
    });

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
  }, [data]);

  if (!data) return null;

  return (
    <div>
      <h2>Network Graph</h2>
      <div className="flex gap-6">
        <svg
          ref={svgRef}
          style={{ border: '1px solid #ddd', width: '800px', height: '600px' }}
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
  );
};
