import { connectToDatabase } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (
	req,
	res
) => {
	try {
		const {
			prompt,
			tag,
			userId,
		} = req.json();

		await connectToDatabase();

		const newPrompt =
			new Prompt({
				creator: userId,
				prompt,
				tag,
			});

		await newPrompt.save();

		return new Response(
			JSON.stringify(newPrompt),
			{
				status: 201,
			}
		);
	} catch (error) {
		console.log(error);
		return new Response("Failed to create a new prompt"), {
            status: 500,
        }
	}
};

export const GET = async (request) => {
	try {
		await connectToDatabase();

		const prompts = await Prompt.find({}).populate('creator');
		return new Response(JSON.stringify(prompts, {
			status: 200,
		}));
	} catch (error) {
		console.log(error);
		return new Response("Failed to fetch all prompts", {
			status: 500,
		});
	}
};
