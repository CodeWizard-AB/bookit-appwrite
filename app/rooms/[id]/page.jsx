import { getRoom } from "@/actions/rooms";
import BookingDetails from "@/components/BookingDetails";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default async function RoomPage({ params }) {
	const { id } = await params;
	const room = await getRoom(id);

	return (
		<div>
			<div className="bg-white shadow rounded-lg p-6">
				<Link
					href="/"
					className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
				>
					<IoArrowBack />
					<span className="ml-2">Back to Rooms</span>
				</Link>
				<BookingDetails room={room} />
				<BookingForm />
			</div>
		</div>
	);
}
