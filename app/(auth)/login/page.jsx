import { login } from "@/actions/auth";
import LoginForm from "@/components/LoginForm";


export default function LoginPage() {
	return (
		<div className="flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
