import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;
const PDF_URL = 'https://education.ucsb.edu/sites/default/files/documents/fake-pdf.pdf';

describe('Koncile Upload API - Real file from URL', () => {
	it(
		'should upload a real PDF from a public URL and return 200',
		async () => {
			if (!API_KEY) throw new Error('Missing API_KEY in .env');

			const fileStream = await axios.get(PDF_URL, { responseType: 'stream' });

			const form = new FormData();
			form.append('files', fileStream.data, {
				filename: 'real-file.pdf',
				contentType: 'application/pdf',
			});

			const response = await axios.post(
				'https://api.koncile.ai/v1/upload_file/',
				form,
				{
					headers: {
						...form.getHeaders(),
						Authorization: `Bearer ${API_KEY}`,
					},
					params: {
						folder_id: 453,
						template_id: 3744,
					},
					maxContentLength: Infinity,
					maxBodyLength: Infinity,
				}
			);

			console.log('📦 Response from Koncile:', JSON.stringify(response.data, null, 2));

			expect(response.status).toBe(200);
		},
		15000
	);
});
