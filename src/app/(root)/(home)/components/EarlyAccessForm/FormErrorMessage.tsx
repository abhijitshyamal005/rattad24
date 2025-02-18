const FormErrorMessage = ({ message }: { message: string | undefined }) => {
	return <span className="text-sm text-red-700">{message}</span>;
};

export { FormErrorMessage };
