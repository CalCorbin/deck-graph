'use client';

import { useCards } from '@/hooks/useCards';
import { MagicCard } from '@/app/components/features/MagicCard/MagicCard';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  label: string;
}

interface Link {
  source: string;
  target: string;
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

    // Sample data structure - adjust based on your actual data
    const nodes: Node[] = [
      { id: '1', label: 'Node 1' },
      { id: '2', label: 'Node 2' },
      { id: '3', label: 'Node 3' },
      { id: '4', label: 'Node 4' },
    ];
    const links: Link[] = [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '3', target: '4' },
      { source: '4', target: '1' },
    ];

    // Set dimensions
    const width = 800;
    const height = 600;

    // Create force simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        'link',
        d3.forceLink(links).id((d: any) => d.id)
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
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create nodes
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', '#4F46E5')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .call(
        d3
          .drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any
      );

    // Create labels
    const labels = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('font-size', '12px')
      .attr('fill', '#fff')
      .text((d: any) => d.label);

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);

      labels.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
    });

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
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
      <svg ref={svgRef} style={{ border: '1px solid #ddd' }} />
      {data.map((card) => (
        <MagicCard key={card.name} name={card.name} />
      ))}
    </div>
  );
};
