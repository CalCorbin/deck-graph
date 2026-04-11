'use client';

import {
  FilterOptions,
  FilterPanel,
} from '@/app/components/FilterPanel/FilterPanel';
import { LoadingSpinner } from '@/app/components/LoadingSpinner/LoadingSpinner';
import { mockDeck } from '@/app/components/NetworkGraph/mockDeck';
import { useCards } from '@/hooks/useCards';
import * as d3 from 'd3';
import { Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Node extends SimulationNodeDatum {
  id: string;
  label: string;
  imageUrl: string;
  cardType?: string;
  rarity?: string;
  manaCost?: string;
}

interface Link extends SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

const getCardTypeColor = (cardType: string) => {
  const colorMap: { [key: string]: string } = {
    Creature: '#4ade80',
    Instant: '#3b82f6',
    Sorcery: '#8b5cf6',
    Artifact: '#f59e0b',
    Enchantment: '#ec4899',
    Planeswalker: '#f97316',
    Land: '#84cc16',
    Battle: '#ef4444',
  };
  return colorMap[cardType] || '#6b7280';
};

const getRarityColor = (rarity: string) => {
  const colorMap: { [key: string]: string } = {
    common: '#9ca3af',
    uncommon: '#60a5fa',
    rare: '#fbbf24',
    mythic: '#f87171',
  };
  return colorMap[rarity?.toLowerCase()] || '#6b7280';
};

export const NetworkGraph = () => {
  const { data, isLoading } = useCards(mockDeck);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    showEdges: true,
    highlightCardTypes: [],
    edgeStyle: 'straight',
    nodeSize: 40,
    forceStrength: -300,
    showLabels: false,
    colorScheme: 'default',
  });

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? 'out' : 'in';
    setScale((prevScale) => {
      const newScale = direction === 'in' ? prevScale * 1.2 : prevScale / 1.2;
      return Math.max(0.5, Math.min(newScale, 5));
    });
  }, []);

  // Add wheel event listener for zoom
  useEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener('wheel', handleWheel, {
        passive: false,
      });
      return () => {
        containerElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]);

  // Update dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        // Account for NavigationBar height (64px = h-16 in Tailwind)
        const navBarHeight = 64;
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight - navBarHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Map card data to nodes with additional properties
    console.log('data', data);
    const nodes: Node[] = data.map((card) => ({
      id: card.id,
      label: card.name,
      imageUrl: card.image_uris?.small || '',
      cardType: card.type_line?.split('—')[0]?.trim(),
      rarity: card.rarity,
      manaCost: card.mana_cost,
    }));

    // Create links between consecutive nodes (circular pattern)
    const links: Link[] = nodes.map((node, index) => ({
      source: node.id,
      target: nodes[(index + 1) % nodes.length].id,
    }));

    // Filter links based on showEdges setting
    const filteredLinks = filters.showEdges ? links : [];

    // Use dynamic dimensions
    const { width, height } = dimensions;

    // Create force simulation with dynamic force strength
    const simulation: Simulation<Node, Link> = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink<Node, Link>(filteredLinks).id((d: Node) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(filters.forceStrength))
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

    // Create links if they should be shown
    let link: d3.Selection<SVGLineElement, Link, SVGGElement, unknown>;
    if (filters.showEdges) {
      link = g
        .append('g')
        .selectAll<SVGLineElement, Link>('line')
        .data(filteredLinks)
        .join('line')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 2)
        .attr(
          'stroke-dasharray',
          filters.edgeStyle === 'dashed' ? '5,5' : null
        );
    }

    // Create node groups
    const nodeGroup = g
      .append('g')
      .selectAll<SVGGElement, Node>('g')
      .data(nodes)
      .join('g')
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      );

    // Add card images
    nodeGroup
      .append('image')
      .attr('href', (d: Node) => d.imageUrl)
      .attr('width', filters.nodeSize)
      .attr('height', filters.nodeSize * 1.4)
      .attr('x', -filters.nodeSize / 2)
      .attr('y', -(filters.nodeSize * 1.4) / 2)
      .attr('preserveAspectRatio', 'xMidYMid slice')
      .attr('clip-path', 'inset(0 round 4px)');

    // Add colored borders for highlighted card types or color schemes
    nodeGroup
      .append('rect')
      .attr('width', filters.nodeSize + 4)
      .attr('height', filters.nodeSize * 1.4 + 4)
      .attr('x', -(filters.nodeSize + 4) / 2)
      .attr('y', -(filters.nodeSize * 1.4 + 4) / 2)
      .attr('fill', 'none')
      .attr('stroke', (d: Node) => {
        if (filters.colorScheme === 'type-based' && d.cardType) {
          return getCardTypeColor(d.cardType);
        }
        if (filters.colorScheme === 'rarity-based' && d.rarity) {
          return getRarityColor(d.rarity);
        }
        if (
          filters.highlightCardTypes.length > 0 &&
          d.cardType &&
          filters.highlightCardTypes.some((type) => d.cardType?.includes(type))
        ) {
          return getCardTypeColor(d.cardType);
        }
        return 'transparent';
      })
      .attr('stroke-width', 2)
      .attr('rx', 4);

    // Add labels if enabled
    if (filters.showLabels) {
      nodeGroup
        .append('text')
        .text((d: Node) => d.label)
        .attr('x', 0)
        .attr('y', filters.nodeSize * 0.8)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('paint-order', 'stroke');
    }

    // Update positions on simulation tick
    simulation.on('tick', () => {
      if (filters.showEdges && link) {
        // Straight lines
        link
          .attr('x1', (d: Link) => (d.source as Node).x ?? 0)
          .attr('y1', (d: Link) => (d.source as Node).y ?? 0)
          .attr('x2', (d: Link) => (d.target as Node).x ?? 0)
          .attr('y2', (d: Link) => (d.target as Node).y ?? 0);
      }

      nodeGroup.attr(
        'transform',
        (d: Node) => `translate(${d.x ?? 0}, ${d.y ?? 0})`
      );
    });

    // Apply zoom transform
    g.attr('transform', `scale(${scale})`);
    g.style('transform-origin', '50% 50%');
    g.style('transition', 'transform 0.3s ease-in-out');

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, scale, dimensions, filters]);

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
      data-testid="network-graph-container"
      className="fixed top-13 left-0 right-0 bottom-0 w-screen overflow-hidden"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        isVisible={filterPanelVisible}
        onToggle={() => setFilterPanelVisible(!filterPanelVisible)}
      />
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.03) 0%, transparent 40%),
            linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #050505 50%, #000000 75%, #0a0a0a 100%)
          `,
        }}
      />
    </div>
  );
};
