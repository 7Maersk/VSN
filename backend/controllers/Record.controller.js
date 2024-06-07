const { Op } = require('sequelize')
const { sequelize } = require('../db.config')
const axios = require('axios')
const { Record, Genre, RecordArtist, Artist, RecordGenre, Country, Song, ExtraArtist, UserCollection } = require('../models')


const fs = require('fs')

function splitArtistName(fullName) {
	if (!fullName) return { first_name: '', last_name: '', surname: '' }

	const nameParts = fullName.split(' ')
	if (nameParts.length === 1) {
		return { first_name: '', last_name: '', surname: nameParts[0] }
	} else if (nameParts.length === 2) {
		return { first_name: nameParts[0], last_name: nameParts[1], surname: '' }
	} else {
		const first_name = nameParts.shift()
		const last_name = nameParts.pop()
		const surname = nameParts.join(' ')
		return { first_name, last_name, surname }
	}
}

function durationToSeconds(duration) {
	if (!duration) {
		return 0
	}
	const parts = duration.split(':').reverse()
	let seconds = 0
	for (let i = 0; i < parts.length; i++) {
		const part = parseInt(parts[i], 10)
		if (!isNaN(part)) {
			seconds += part * Math.pow(60, i)
		}
	}
	return seconds
}

function parseReleaseDate(releaseDateStr) {
	if (!releaseDateStr) return new Date('2000-01-01')

	const parts = releaseDateStr.split('-')
	let year = parts[0] || '2000'
	let month = parts[1] || '01'
	let day = parts[2] || '01'

	if (month === '00') month = '01'
	if (day === '00') day = '01'

	return new Date(`${year}-${month}-${day}`)
}

/**
 * @param {string} path
 * @param {{ images: {resource_url: string, type: string}[], title: string, }} data
 * @returns {string} название обложки с расширением (.jpg, .jpeg, .png, ...)
 */
const saveAlbumImage = async (data, path) => {
	if (!data.images || data.images.length === 0) {
		return 'empty.png';
	}

	const primary = data.images.find((image) => image.type === 'primary');
	const secondary = data.images.find((image) => image.type === 'secondary');

	const fetchImage = async (url, retries = 3) => {
		for (let attempt = 1; attempt <= retries; attempt++) {
			try {
				const response = await axios.get(`https://api.codetabs.com/v1/proxy/?quest=${url}`, {
					responseType: 'arraybuffer',
					timeout: 10000,
				});
				return response.data;
			} catch (error) {
				if (attempt === retries) {
					console.error(`Failed to fetch image after ${retries} attempts:`, error);
					return null;
				}
				console.warn(`Attempt ${attempt} failed, retrying...`);
			}
		}
		return null;
	};

	try {
		let imageData;
		let fileName;

		if (!primary) {
			if (!secondary) {
				return 'empty.png';
			}
			imageData = await fetchImage(secondary.resource_url);
			if (!imageData) {
				return 'empty.png';
			}
			fileName = `${data.title}.${secondary.resource_url.split('/').pop().split('.').pop()}`.replaceAll(' ', '_');
		} else {
			imageData = await fetchImage(primary.resource_url);
			if (!imageData) {
				return 'empty.png';
			}
			fileName = `${data.title}.${primary.resource_url.split('/').pop().split('.').pop()}`.replaceAll(' ', '_');
		}

		await fs.promises.writeFile(`${path}${fileName}`, imageData);
		return fileName;
	} catch (err) {
		console.error(err);
		return 'Ошибка при сохранении изображения';
	}
}


const saveArtistImage = async (data, path) => {
	const fetchImage = async (url, retries = 3) => {
		for (let attempt = 1; attempt <= retries; attempt++) {
			try {
				const response = await axios.get(`https://api.codetabs.com/v1/proxy/?quest=${url}`, {
					responseType: 'arraybuffer',
					timeout: 10000,
				});
				return response.data;
			} catch (error) {
				if (attempt === retries) {
					console.error(`Failed to fetch image after ${retries} attempts:`, error);
					throw error;
				}
				console.warn(`Attempt ${attempt} failed, retrying...`);
			}
		}
	};

	const primary = data.images.find((image) => image.type === 'primary');
	const secondary = data.images.find((image) => image.type === 'secondary');

	try {
		let imageUrl;
		let fileName;

		if (!primary) {
			if (!secondary) {
				return 'blank.png';
			}
			imageUrl = secondary.resource_url;
			fileName = `${data.name}.${secondary.resource_url.split('/').pop().split('.').pop()}`.replaceAll(' ', '_');
		} else {
			imageUrl = primary.resource_url;
			fileName = `${data.name}.${primary.resource_url.split('/').pop().split('.').pop()}`.replaceAll(' ', '_');
		}

		const imageData = await fetchImage(imageUrl);
		await fs.promises.writeFile(`${path}${fileName}`, imageData);
		return fileName;
	} catch (err) {
		console.error(err);
		return 'blank.png';
	}
};

module.exports = {
	async findAll(req, res) {
		try {
			const records = await Record.findAll({
				attributes: ['id', 'name', 'cover', 'release_date'],
				include: [
					{
						model: Artist,
						attributes: ['nickname'],
						through: { attributes: [] },
					},
					{
						model: Genre,
						attributes: ['name'],
						through: { attributes: [] },
					},
				],
			})
			return res.json({ records })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Ошибка при поиске всех записей' })
		}
	},

	async addById(req, res) {
		const releaseId = req.body.releaseId
		const discogsUrl = `https://api.discogs.com/releases/${releaseId}?key=${process.env.DISCOGS_API_KEY}&secret=${process.env.DISCOGS_API_SECRET}`

		const transaction = await sequelize.transaction()

		try {
			const response = await axios.get(discogsUrl)
			const data = response.data

			if (data.message && data.message === 'Release not found.') {
				await transaction.rollback()
				return res.status(404).json({ message: 'Релиз не найден в Discogs.' })
			}

			const isVinyl = data.formats.some((format) => /vinyl/i.test(format.name) || /lp/i.test(format.name))

			if (!isVinyl) {
				await transaction.rollback()
				return res.status(400).json({ message: 'Релиз не является пластинкой.' })
			}

			const name = data.title
			const katalog_number = data.labels[0]?.catno
			const release_date = parseReleaseDate(data.released)
			const countryName = data.country
			const cover = await saveAlbumImage(data, 'public/albums/')
			const rating = data.community?.rating?.average || 0
			let country = await Country.findOne({ where: { name: countryName }, transaction })
			if (!country) {
				country = await Country.create({ name: countryName }, { transaction })
			}
			const countryId = country ? country.id : null
			const newRecord = await Record.create(
				{
					name,
					katalog_number,
					release_date,
					country_id: countryId,
					cover,
					rating,
				},
				{ transaction }
			)

			const artists = data.artists || []
			for (const artist of artists) {
				let dbArtist = await Artist.findOne({ where: { nickname: artist.name }, transaction })
				if (!dbArtist) {
					const artistResponse = await axios.get(
						`${artist.resource_url}?key=${process.env.DISCOGS_API_KEY}&secret=${process.env.DISCOGS_API_SECRET}`
					)
					const artistData = artistResponse.data
					const { first_name, last_name, surname } = splitArtistName(artistData.realname)

					let avatar;
					if (artistResponse.data.images && artistResponse.data.images.length > 0) {
						avatar = await saveArtistImage(artistData, 'public/artists/');
					} else {
						avatar = 'blank.png';
					}
					dbArtist = await Artist.create(
						{
							nickname: artist.name,
							first_name,
							last_name,
							surname,
							bio: artistData.profile || '',
							avatar: avatar,
						},
						{ transaction }
					)
				}

				await RecordArtist.create(
					{
						record_id: newRecord.id,
						artist_id: dbArtist.id,
					},
					{ transaction }
				)
			}

			const genres = data.genres || []
			for (const genreName of genres) {
				let genre = await Genre.findOne({ where: { name: genreName }, transaction })
				if (!genre) {
					genre = await Genre.create({ name: genreName }, { transaction })
				}
				const genreId = genre ? genre.id : null
				await RecordGenre.create(
					{
						record_id: newRecord.id,
						genre_id: genreId,
					},
					{ transaction }
				)
			}

			const tracklist = data.tracklist || []
			for (const track of tracklist) {
				const durationString = track.duration
				const duration = durationToSeconds(durationString)
				const newSong = await Song.create(
					{
						title: track.title,
						duration,
						position: track.position,
						record_id: newRecord.id,
					},
					{ transaction }
				)

				if (track.extraartists && track.extraartists.length > 0) {
					for (const extraArtist of track.extraartists) {
						if (extraArtist.role === 'Featuring') {
							let dbArtist = await Artist.findOne({ where: { nickname: extraArtist.name }, transaction })
							if (!dbArtist) {
								const artistResponse = await axios.get(
									`${extraArtist.resource_url}?key=${process.env.DISCOGS_API_KEY}&secret=${process.env.DISCOGS_API_SECRET}`
								)
								const artistData = artistResponse.data
								const { first_name, last_name, surname } = splitArtistName(artistData.realname)

								let avatar;
								if (artistResponse.data.images && artistResponse.data.images.length > 0) {
									avatar = await saveArtistImage(artistData, 'public/artists/');
								} else {
									avatar = 'blank.png';
								}
								dbArtist = await Artist.create(
									{
										nickname: extraArtist.name,
										first_name,
										last_name,
										surname,
										bio: artistData.profile || '',
										avatar: avatar,
									},
									{ transaction }
								)
							}

							await ExtraArtist.create(
								{
									song_id: newSong.id,
									artist_id: dbArtist.id,
								},
								{ transaction }
							)
						}
					}
				}
			}

			await transaction.commit()
			return res.json(newRecord)
		} catch (error) {
			await transaction.rollback()
			console.error('Error fetching data from Discogs API:', error)
			return res.status(500).json({ message: 'Ошибка при запросе данных из Discogs API' })
		}
	},

	async findById(req, res) {
		const recordId = req.params.recordId;

		try {
			const record = await Record.findByPk(recordId, {
				include: [
					{
						model: Country,
						attributes: ['name'],
					},
					{
						model: Artist,
						attributes: ['id', 'nickname'],
						through: { attributes: [] },
					},
					{
						model: Song,
						attributes: ['title', 'duration', 'position'],
						order: [['position', 'ASC']],
						include: [
							{
								model: ExtraArtist,
								attributes: ['id'],
								include: [
									{
										model: Artist,
										attributes: ['nickname'],
									},
								],
							},
						],
					},
					{
						model: Genre,
						attributes: ['name'],
						through: { attributes: [] },
					},
				],
			});

			if (!record) {
				return res.status(404).json({ message: 'Запись не найдена' });
			}

			return res.json({ record });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Ошибка при поиске записи' });
		}
	},

	async findByGenre(req, res) {
		const genreName = req.params.genre
		try {
			const genre = await Genre.findOne({
				where: { name: genreName },
			})

			if (!genre) {
				return res.status(404).json({ message: 'Жанр не найден' })
			}

			const recordsGenres = await RecordGenre.findAll({
				where: { genre_id: genre.id },
			})

			const recordIds = recordsGenres.map((recordGenre) => recordGenre.record_id)
			const records = await Record.findAll({
				where: { id: recordIds },
				attributes: ['id', 'name', 'cover', 'release_date'],
				include: [
					{
						model: Artist,
						attributes: ['nickname'],
						through: { attributes: [] },
					},
				],
			})

			return res.json({ records })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Ошибка при поиске записей по жанру' })
		}
	},

	async findByCountry(req, res) {
		const countryName = req.params.countryName
		try {
			const country = await Country.findOne({
				where: { name: countryName },
			})

			if (!country) {
				return res.status(404).json({ message: 'Страна не найдена' })
			}

			const countryId = country.id

			const records = await Record.findAll({
				where: {
					country_id: countryId,
				},
				attributes: ['id', 'name', 'cover'],
				include: [
					{
						model: Artist,
						attributes: ['nickname'],
						through: { attributes: [] },
					},
				],
			})

			return res.json({ records })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Ошибка при поиске записей по стране' })
		}
	},

	async findByArtist(req, res) {
		const artistName = req.params.artistName

		try {
			const artist = await Artist.findOne({ where: { nickname: artistName } })

			if (!artist) {
				return res.status(404).json({ message: 'Артист не найден' })
			}

			const records = await Record.findAll({
				include: [
					{
						model: Artist,
						attributes: ['nickname'],
						through: { attributes: [] },
						where: { nickname: artistName },
					},
				],
				attributes: ['id', 'name', 'cover', 'release_date'],
			})

			return res.json({ records })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Ошибка при поиске пластинок по артисту' })
		}
	},

	async findByArtistId(req, res) {
		const artistId = req.params.artistId

		try {
			const artist = await Artist.findByPk(artistId)

			if (!artist) {
				return res.status(404).json({ message: 'Артист не найден' })
			}

			const records = await Record.findAll({
				include: [
					{
						model: Artist,
						attributes: ['nickname'],
						through: { attributes: [] },
						where: { id: artistId },
					},
				],
				attributes: ['id', 'name', 'cover'],
			})

			return res.json({ records })
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Ошибка при поиске пластинок по id артиста' })
		}
	},

	async getRecommendations(req, res) {
		const userId = req.body.userId || req.params.userId;

		if (!userId) {
			return res.status(400).json({ message: 'userId не указан' });
		}

		try {
			const userCollection = await UserCollection.findAll({
				where: { user_id: userId }
			});

			if (userCollection.length === 0) {
				return res.status(404).json({ message: 'Коллекция пользователя пуста' });
			}

			const recordIds = userCollection.map(item => item.record_id);
			const recordGenres = await RecordGenre.findAll({
				where: { record_id: recordIds }
			});

			const genreIds = recordGenres.map(recordGenre => recordGenre.genre_id);

			const recordArtists = await RecordArtist.findAll({
				where: { record_id: recordIds }
			});

			const artistIds = recordArtists.map(recordArtist => recordArtist.artist_id);

			const recommendations = await Record.findAll({
				where: {
					id: {
						[Op.notIn]: recordIds
					},
					[Op.or]: [
						{
							'$genres.id$': {
								[Op.in]: genreIds
							}
						},
						{
							'$artists.id$': {
								[Op.in]: artistIds
							}
						}
					]
				},
				include: [
					{
						model: Genre,
						through: { attributes: [] },
						attributes: ['name']
					},
					{
						model: Artist,
						through: { attributes: [] },
						attributes: ['nickname']
					}
				]
			});

			const formattedRecommendations = recommendations.map(record => ({
				id: record.id,
				name: record.name,
				cover: record.cover,
				genres: record.genres.map(genre => genre.name),
				artists: record.artists.map(artist => artist.nickname)
			}));

			return res.json({ recommendations: formattedRecommendations });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Ошибка при получении рекомендаций' });
		}
	}
}
