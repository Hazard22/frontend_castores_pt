import { Avatar, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import {
    HeartOutlined,
    HeartFilled,
    CaretRightOutlined
  } from '@ant-design/icons';
import { useState } from "react";
import { deleteRequest, postRequest } from "../services/fetchServices";
const api_host = import.meta.env.VITE_API_HOST

export default function VideoCard({video, setopenPlayer, setvideoId}) {

    const [isFavorite, setisFavorite] = useState(video.isFavorite);

    const openMediaPlayer = (videoId) => {  
        setvideoId(videoId)
        setopenPlayer(true)
    }

    const handleAddToFavorite = async () => {  
        try {
            setisFavorite(true)
            const response = await postRequest(
                `${api_host}/users/add-favorite?video_id=${video.id}`,
                {'Content-Type': 'application/json',},
            )
            if(response.status === 200){
                return
            }
            else{
                throw new Error('Ha ocurrido un error')
            }
        } catch (error) {
            setisFavorite(false)
        }
    }

    const handleRemoveFavorite = async () => {  
        try {
            setisFavorite(false)
            const response = await deleteRequest(
                `${api_host}/users/remove-favorite?video_id=${video.id}`,
                {'Content-Type': 'application/json',},
            )
            if(response.status === 200){
                return
            }
            else{
                throw new Error('Ha ocurrido un error')
            }
        } catch (error) {
            setisFavorite(true)
        }
    }

    return ( 
        <div key={video.id}>
            <Card
            style={{
            width: 300,
            }}
            cover={
                <img src={video.thumbnail} alt="Thumbnail"/>
            }
            actions={[
                <Tooltip title='Reproducir'>
                    <CaretRightOutlined 
                    key='watch'
                    onClick={() => openMediaPlayer(video.id)}
                    />
                </Tooltip>,
                <Tooltip title={isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}>
                    {isFavorite ? (
                        <HeartFilled 
                        key="favorite"
                        onClick={handleRemoveFavorite}
                        />
                    ) : (
                        <HeartOutlined 
                        key="favorite"
                        onClick={handleAddToFavorite}
                        />
                    )}
                </Tooltip>
            ]}
            >
                <Meta
                title={video.title}
                description={video.description}
                />
            </Card>
        </div>
    )
}
