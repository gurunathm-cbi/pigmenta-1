interface PaintingCardProps {
  imageUrl: string;
  artistName: string;
  artistPhoto: string;
  paintingTitle: string;
  medium: string;
  location: string;
}

const PaintingCard = ({
  imageUrl,
  artistName,
  artistPhoto,
  paintingTitle,
  medium,
  location,
}: PaintingCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm border">
      {/* Painting Image */}
      <img
        src={imageUrl}
        alt={paintingTitle}
        className="h-56 w-full object-cover"
        loading="lazy"
      />

      <div className="p-4">
        {/* Painting Info */}
        <h3 className="text-lg font-semibold text-gray-900">
          {paintingTitle}
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          Medium: {medium}
        </p>

        {/* Artist Section */}
        <div className="mt-4 flex items-center gap-3">
          <img
            src={artistPhoto}
            alt={artistName}
            className="h-10 w-10 rounded-full object-cover"
            loading="lazy"
          />

          <div>
            <p className="font-medium text-gray-900">
              {artistName}
            </p>
            <p className="text-sm text-gray-500">
              {location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingCard;