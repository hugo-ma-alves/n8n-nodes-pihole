import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class PiHoleApi implements ICredentialType {
	name = 'piHoleApi';
	displayName = 'Pi-Hole API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: false,
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				auth: '={{$credentials.apiKey}}',
			},
		},
	};
}
