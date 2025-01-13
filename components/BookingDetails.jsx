import Image from "next/image";

export default function BookingDetails({ room }) {
	return (
		<div className="flex flex-col sm:flex-row sm:space-x-6">
			<figure className="relative w-1/2 h-80">
				<Image src={room.image} alt={room.name} fill className="object-cover" />
			</figure>

			<div className="mt-4 sm:mt-0 sm:flex-1">
				<p className="text-gray-600 mb-4">{room.description}</p>

				<ul className="space-y-2">
					<li>
						<span className="font-semibold text-gray-800">Size:</span>{" "}
						{room.sqft} sq ft
					</li>
					<li>
						<span className="font-semibold text-gray-800">Availability:</span>
						{room.availability}
					</li>
					<li>
						<span className="font-semibold text-gray-800">Price:</span>$
						{room.price_per_hour}/hour
					</li>
					<li>
						<span className="font-semibold text-gray-800">Address:</span>{" "}
						{room.address}
					</li>
				</ul>
			</div>
		</div>
	);
}
