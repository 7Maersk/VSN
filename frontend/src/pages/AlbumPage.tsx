import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import server from '../main';

import Sidebar from '@/components/Sidebar'
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

// import albumsData from './albums.json'


interface Album {
    id: number;
    name: string;
    cover: string;
    release_date: string;
    country: {
        name: string;
    };
    rating: number;
    artists: {
        nickname: string;
    }[];
}

interface Artist {
    id: number
    nickname: string
    first_name: string
    last_name: string
    surname: string
    bio: string
    avatar: string
}

interface Albums {
    id: number
    name: string
    cover: string
    artists: Artist[]
}

const AlbumPage = () => {
    const { id } = useParams<{ id: string }>();
    const [album, setAlbum] = useState<Album>()
    const [albums, setAlbums] = useState<Albums>()

    const [t] = useTranslation("global")


    useEffect(() => {
        server.get(`/records/${id}`)
            .then(response => {
                setAlbum(response.data.record);
            })
            .catch(error => {
                console.error('Ошибка при загрузке альбома:', error);
            });
    }, [id]);

    useEffect(() => {
        server.get(`/artists/record/${id}`)
            .then(response => {
                const recnickname = response.data.nickname;

                server.get(`/records/artist/${recnickname}`)
                    .then(response => {
                        setAlbums(response.data.records);
                    })
                    .catch(error => {
                        console.error('Ошибка при поиске альбомов артиста:', error);
                    });
            })
            .catch(error => {
                console.error('Ошибка при поиске артиста:', error);
            });
    }, [id]);

    console.log(albums)



    if (!album) {
        return <div>404</div>
    }

    // if (!albums) {
    //     return <div>нет других альбомов</div>
    // }

    return (
        <div className="h-full grid grid-cols-[20rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-4 gap-2">
            <div className="col-span-1 row-span-4">
                <Sidebar />
            </div>
            <div className="col-span-8 row-span-4">
                <div>
                    <h2>{album.name}</h2>
                    <img src={album.cover} alt={`Album ${album.name}`} />
                    <p>Release Date: {album.release_date}</p>
                    <p>Country: {album.country.name}</p>
                    <p>Rating: {album.rating}</p>
                    <p>Artists: {album.artists.map(artist => artist.nickname).join(', ')}</p>
                </div>
                <div className="col-span-6">
                    <h3 className="col-span-6 scroll-m-20 text-2xl font-semibold tracking-tight">
                        {t("translation.more")}
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
                                                    <span className="text-base font-semibold">
                                                        {rec.name}
                                                    </span>
                                                    <span className="text-sm font-semibold">
                                                        {rec.artists.map((artist: Artist) => artist.nickname).join(', ')}
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
    );
}

export default AlbumPage;
