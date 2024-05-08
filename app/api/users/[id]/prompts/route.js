import Prompt from '@models/prompt';
import { connectToDatabase } from '@utils/database';


export const GET = async (request, { params }) => {
	try {
		await connectToDatabase();
		const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        
		console.log(prompts);
		return new Response(JSON.stringify(prompts, {
			status: 200,
		}));
	} catch (error) {
		console.log(error);
		return new Response("Failed to fetch creator prompts", {
			status: 500,
		});
	}
};