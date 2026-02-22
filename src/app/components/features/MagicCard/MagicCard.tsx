export const MagicCard = ({ name, id }: { name: string; id: number }) => {
  return (
    <tr>
      <td className="border border-gray-300 px-3 py-1">{name}</td>
      <td className="border border-gray-300 px-3 py-1">{id}</td>
    </tr>
  );
};
