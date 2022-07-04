import { IMessage } from '@rocket.chat/core-typings';
import { Messages } from '@rocket.chat/models';
import { BulkWriteOperation } from 'mongodb';

import { addMigration } from '../../lib/migrations';

addMigration({
	version: 275,
	async up() {
		const updates: BulkWriteOperation<IMessage>[] = [];

		const fieldsToUpdate = ['editedBy', 'editedAt', 'emoji', 'avatar', 'alias', 'customFields', 'groupable', 'attachments', 'reactions'];

		fieldsToUpdate.map((field) => {
			return updates.push({
				updateMany: {
					filter: {
						$or: [{ [field]: { $type: 'undefined' } }, { [field]: { $type: 'null' } }],
					},
					update: {
						$unset: {
							[field]: '',
						},
					},
				},
			});
		});

		await Messages.col.bulkWrite(updates);
	},
});
