import { Flex, Modal } from "antd";
import VideoCard from "./VideoCard";
import { useState } from "react";

export default function VideoGallery({videos}) {

    const [openPlayer, setopenPlayer] = useState(false);
    const [videoId, setvideoId] = useState(null);

    const handleClose = () => {  
        setopenPlayer(false)
        setvideoId(null)
    }

    return (
        <>
        <Flex wrap gap="small" justify="center"
        style={{
            marginTop:10
        }}
        >
            {videos.map(video => (
                <VideoCard 
                video={video}
                setopenPlayer={setopenPlayer}
                setvideoId={setvideoId}
                />
            ))}
        </Flex>
        {(openPlayer && videoId) && (
            <Modal 
            title='Reproductor'
            open={openPlayer}
            centered
            footer={null}
            width='80%'
            closable={true}
            onCancel={handleClose}
            >
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="Responsive Iframe"
                    style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                    }}
                    allowFullScreen
                ></iframe>
                </div>
            </Modal>
        )}
        </>
    )
}
