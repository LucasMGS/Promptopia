'use client';
import {
	useEffect,
	useState,
} from 'react';
import {
	useRouter,
	useSearchParams,
} from 'next/navigation';
import Form from '@components/Form';

useEffect(() => {
	const getPromptDetails =
		async () => {
			const response =
				await fetch(
					`/api/prompt/${promptId}`
				);
			const data =
				await response.json();
			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

	if (promptId)
		getPromptDetails();
}, [promptId]);

const EditPrompt = () => {
	const router = useRouter();
	const [promptId] =
		useSearchParams('id');

	const [
		submitting,
		setSubmitting,
	] = useState(false);
	const [post, setPost] =
		useState({
			prompt: '',
			tag: '',
		});

	const updatePrompt = async (
		e
	) => {
		e.preventDefault();
		setSubmitting(true);
        if(!promptId) return alert('Prompt ID not found');
		try {
			const response =
				await fetch(
					`/api/prompt/${promptId}`,
					{
						method: 'PATCH',
						headers: {
							'Content-Type':
								'application/json',
						},
						body: JSON.stringify(
							{
								prompt: post.prompt,
								tag: post.tag,
							}
						),
					}
				);

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}

		return (
			<Form
				type="Edit"
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmiot={updatePrompt}
			/>
		);
	};
};

export default EditPrompt;
