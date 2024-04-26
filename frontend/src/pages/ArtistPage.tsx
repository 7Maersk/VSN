import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Sidebar from '@/components/Sidebar'
import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import api from '@/api/api.config'
import { Album, Albums, Artist } from '@/types'

const ArtistPage = () => {
    const { id } = useParams<{ id: string }>()
    const [artist, setArtist] = useState<Artist | null>(null)
    const [albums, setAlbums] = useState<Albums[]>([])

    const [t] = useTranslation('global')

    useEffect(() => {
        api.getArtist(id || '1').then((artist) => setArtist(artist))
        api.getRecordsArtistId(id || '1').then((albums: Albums[]) => {
            setAlbums(albums)
        })
    }, [id])

    if (!artist) {
        return <div>404</div>
    }

    if (!albums) {
        return <div>нет других альбомов</div>
    }

    return (
        <div className="h-full grid grid-cols-[20rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-4 gap-2">
            <div className="col-span-1 row-span-4">
                <Sidebar />
            </div>
            <div className="col-span-8 row-span-4">
                <div>
                    <h2>{artist.nickname}</h2>
                    <img src={artist.avatar} alt={`Album ${artist.nickname}`} />
                    <p>First name: {artist.first_name}</p>
                    <p>Surname: {artist.surname}</p>
                    <p>Last name: {artist.last_name}</p>
                    <p>Bio: {artist.bio}</p>
                </div>
                <div className="col-span-6">
                    <h3 className="col-span-6 scroll-m-20 text-2xl font-semibold tracking-tight">
                        {t('translation.more')}
                    </h3>
                    <Carousel
                        opts={{
                            align: 'start',
                        }}
                        className="w-full "
                    >
                        {albums && (
                            <CarouselContent>
                                {albums.map((rec) => (
                                    <CarouselItem key={rec.name} className="md:basis-1/2 lg:basis-60 py-2">
                                        <Card className="rounded-md border-none shadow-sm">
                                            <CardContent className="flex aspect-square items-end justify-start p-6 relative">
                                                <Link to={`/album/${rec.id}`} className="contents">
                                                    <img
                                                        src={rec.cover}
                                                        alt={`Album ${rec.name}`}
                                                        className="absolute w-full h-full object-cover object-center top-0 left-0 rounded-t-md"
                                                    />
                                                </Link>
                                            </CardContent>
                                            <CardFooter className="border border-t-0 rounded-bl-md rounded-br-md p-0">
                                                <Link
                                                    to={`/album/${rec.id}`}
                                                    className="flex w-full h-full flex-col items-start px-4 py-2"
                                                >
                                                    <span className="text-base font-semibold">{rec.name}</span>
                                                    <span className="text-sm font-semibold">
                                                        {rec.artists
                                                            .map((artist: Artist) => artist.nickname)
                                                            .join(', ')}
                                                    </span>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        )}
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default ArtistPage
