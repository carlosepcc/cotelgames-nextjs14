import { PathCell } from ".";

interface BoardCellProps {
  cell: PathCell;
}

const BoardCell: React.FC<BoardCellProps> = ({ cell }) => {
  return (
    <div
      className={`
        p-6 rounded-lg text-center 
        shadow-lg hover:shadow-xl transition-shadow duration-300
        bg-gradient-to-br from-white to-[${cell.media.color}]
        dark:from-gray-800 dark:to-[${cell.media.color}]
      `}
    >
      {/* Fallback Emoji */}
      <div
        className="text-7xl mb-4"
        style={{ color: cell.media.color }} // Use the color for the emoji
      >
        {cell.media.fallback}
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold text-gray-900 dark:text-white"
        style={{ color: cell.media.color }} // Use the color for the title
      >
        {cell.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        {cell.description}
      </p>

      {/* Property Value */}
      {cell.type === "property" && (
        <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">
          Value: ${cell.value}
        </p>
      )}

      {/* Owner Information */}
      {cell.metadata?.ownerId && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Owned by: {cell.metadata.ownerId}
        </p>
      )}
    </div>
  );
};

export default BoardCell;
