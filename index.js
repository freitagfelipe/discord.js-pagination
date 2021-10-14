const pagination = async (message, pages, timeout = 60000, emojiList = ['⏪', '⏩'], onlyAuthorCanReact = false, endPage = undefined) => {
	if (!message && !message.channel) {
		throw new Error('Is not possible send a message in this channel.');
	} else if (!pages) {
		throw new Error('.');
	} else if (emojiList.length !== 2) {
		throw new Error('Need two emojis.');
	}
	
	let page = 0;
	const currentPage = await message.channel.send({ embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)] });

	if (pages.length > 1) {
		for (const emoji of emojiList) {
			await currentPage.react(emoji);
		}
	}

	const reactionCollector = currentPage.createReactionCollector({ time: timeout });

	reactionCollector.on('collect', (reaction, user) => {
		if(user.id !== message.client.user.id) {
			reaction.users.remove(user);
		}

		if (user.bot) {
			return;
		} else if(onlyAuthorCanReact && user.id != message.author.id) {
			return;
		}

		switch (reaction.emoji.name) {
			case emojiList[0]:
				page = page > 0 ? --page : pages.length - 1;

				break;
			case emojiList[1]:
				page = page + 1 < pages.length ? ++page : 0;

				break;
			default:
				break;
		}

		currentPage.edit({ embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)] });
	});

	reactionCollector.on('end', () => {
		if (!currentPage.reactions.message.deleted) {
			if (endPage) {
				currentPage.edit({ embeds: [endPage] });
			}

			currentPage.reactions.removeAll();
		}
	});

	return currentPage;
};

module.exports = pagination;