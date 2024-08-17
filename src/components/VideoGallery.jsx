import { Flex } from "antd";
import VideoCard from "./VideoCard";

export default function VideoGallery({videos}) {

    return (
        <Flex wrap gap="small" justify="center"
        style={{
            marginTop:10
        }}
        >
            {videos.map(video => (
                <VideoCard video={video}/>
            ))}
        </Flex>
    )
}
