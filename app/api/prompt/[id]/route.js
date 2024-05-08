import Prompt from '@models/prompt';
import { connectToDatabase } from '@utils/database';

export const GET = async (request, {params}) => {
	try {
		await connectToDatabase();
		const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }
		
		return new Response(JSON.stringify(prompt, {
			status: 200,
		}));
	} catch (error) {
		console.log(error);
		return new Response("Failed to fetch prompt", {
			status: 500,
		});
	}
};

export const PATCH = async (request, {params}) => {
    try {
        await connectToDatabase();
        const promptFound = await Prompt.findByIdAndUpdate(params.id, request.json(), {
            new: true,
        });
        if(!promptFound) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }
        
        return new Response(JSON.stringify(prompt, {
            status: 200,
        }));
    } catch (error) {
        console.log(error);
        return new Response("Failed to update prompt", {
            status: 500,
        });
    }
};

export const DELETE = async (request, {params}) => {
    try {
        await connectToDatabase();
        const promptFound = await Prompt.findByIdAndDelete(params.id);
        if(!promptFound) {
            return new Response("Prompt not found", {
                status: 404,
            });
        }
        
        return new Response(JSON.stringify(prompt, {
            status: 200,
        }));
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete prompt", {
            status: 500,
        });
    }
}
            
