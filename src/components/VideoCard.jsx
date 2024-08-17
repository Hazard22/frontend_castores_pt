import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import {
    HeartOutlined,
    HeartFilled
  } from '@ant-design/icons';

export default function VideoCard({video}) {

    return ( 
        <div key={video.id}>
            <Card
            style={{
            width: 300,
            }}
            cover={
            
                <iframe
                key={video.id}
                width="200"
                src={`https://www.youtube.com/embed/${video.id}`}
                allowFullScreen
                ></iframe>
            }
            actions={[
                <HeartOutlined key="favorite" />,
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
