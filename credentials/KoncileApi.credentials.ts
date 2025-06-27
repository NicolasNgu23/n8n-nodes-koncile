import {
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
} from 'n8n-workflow';

import type { IHttpRequestMethods } from 'n8n-workflow';

export class KoncileApi implements ICredentialType {
	name = 'koncileApi';
	displayName = 'Koncile API';
	documentationUrl = 'https://koncile.ai/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'api_key',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate = {
		type: 'generic' as const,
		properties: {
			headers: {
				Authorization: 'Bearer={{$credentials.api_key}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'POST' as IHttpRequestMethods,
			url: 'https://api.koncile.ai/v1/check_api_key/',
		},
	};
}
