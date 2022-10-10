import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class PiHole implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		properties: [
			{
				displayName: 'API Url',
				name: 'apiUrl',
				type: 'string',
				required: true,
				noDataExpression: false,
				default: 'http://localhost/admin/api.php',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'ApiVersion',
						value: 'apiVersion',
					},
					{
						name: 'RecentBlocked',
						value: 'recentBlocked',
					},
					{
						name: 'Status',
						value: 'status',
					},
					{
						name: 'Summary',
						value: 'summary',
					},
					{
						name: 'TopClient',
						value: 'topClient',
					},
					{
						name: 'TopClientBlocked',
						value: 'topClientBlocked',
					},
					{
						name: 'Type',
						value: 'type',
					},
					{
						name: 'Version',
						value: 'version',
					},
				],
				default: 'version',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['apiVersion'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the API version',
						description: 'Get the API version (2 or 3)',
						routing: {
							request: {
								method: 'GET',
								qs: {
									version: '',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['recentBlocked'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the recently blocked domains',
						description: 'Show most recent blocked domain',
						routing: {
							request: {
								method: 'GET',
								qs: {
									recentBlocked: '',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['status'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the status',
						description: 'Get the global status of the Pi-hole system',
						routing: {
							request: {
								method: 'GET',
								qs: {
									status: '',
								},
							},
						},
					},
					{
						name: 'Enable',
						value: 'enable',
						action: 'Enable',
						description: 'Enabled the the Pi-hole system',
						routing: {
							request: {
								method: 'GET',
								qs: {
									enable: '',
								},
							},
						},
					},
					{
						name: 'Disable',
						value: 'disable',
						action: 'Disable',
						description: 'Disable the the Pi-hole system',
						routing: {
							request: {
								method: 'GET',
								qs: {
									disable: '',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['status'],
						operation: ['disable'],
					},
				},
				options: [
					{
						displayName: 'Seconds',
						name: 'disableSeconds',
						type: 'number',
						typeOptions: {
							minValue: 0,
							numberStepSize: 1,
						},
						default: '',
						description: 'Disable Pi-hole for this amount of seconds',
						routing: {
							request: {
								qs: {
									disable: '={{$value}}',
								},
							},
						},
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['summary'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the summary',
						description: 'Get generic statistics about blocked queries and users',
						routing: {
							request: {
								method: 'GET',
								qs: {
									summary: '',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['topClient'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the clients with more requests',
						description:
							'Get the top 10 clients with the higher number of requests. Results are in descending order.',
						routing: {
							request: {
								method: 'GET',
								qs: {
									topClients: '10',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFieldsTopClient',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['topClient'],
					},
				},
				options: [
					{
						displayName: 'Number Results',
						name: 'numberOfResults',
						type: 'number',
						typeOptions: {
							minValue: 1,
							numberStepSize: 1,
						},
						default: 10,
						description: 'Gets at most this number of results',
						routing: {
							request: {
								qs: {
									topClients: '={{$value}}',
								},
							},
						},
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['topClientBlocked'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the clients with more blocked requests',
						description:
							'Get the top 10 clients with the higher number of blocked requests. Results are in descending order.',
						routing: {
							request: {
								method: 'GET',
								qs: {
									topClientsBlocked: '10',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFieldsTopClientBlocked',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['topClientBlocked'],
					},
				},
				options: [
					{
						displayName: 'Number Results',
						name: 'numberOfResults',
						type: 'number',
						typeOptions: {
							minValue: 1,
							numberStepSize: 1,
						},
						default: 10,
						description: 'Gets at most this number of results',
						routing: {
							request: {
								qs: {
									topClientsBlocked: '={{$value}}',
								},
							},
						},
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['type'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the API type',
						description: 'Get return the backend used by the API (either PHP or FTL)',
						routing: {
							request: {
								method: 'GET',
								qs: {
									type: '',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['version'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the software versions',
						description: 'Determine if updates are available for Pi-hole',
						routing: {
							request: {
								method: 'GET',
								qs: {
									versions: '',
								},
							},
						},
					},
				],
				default: 'get',
			},
		],
		displayName: 'Pi-hole',
		name: 'PiHole',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:pihole.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get information from Pi-hole API',
		defaults: {
			name: 'Pi-hole',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'piHoleApi',
				required: false,
			},
		],
		requestDefaults: {
			baseURL: '={{$parameter["apiUrl"]}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
	};
}
