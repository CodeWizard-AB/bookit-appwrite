import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
	return (
		<div className="flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
				<RegisterForm />
			</div>
		</div>
	);
}
