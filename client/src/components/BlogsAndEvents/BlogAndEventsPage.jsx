import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Avatar, Button, Divider, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Favorite, Repeat, ChatBubbleOutline, Share } from "@mui/icons-material";

const initialPosts = [
    { id: 1, user: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg", content: "Just listed a new rental!", image: "https://source.unsplash.com/600x400/?apartment", timestamp: "2h ago", type: "post" },
    { id: 2, user: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg", content: "New rental opportunities available.", image: "https://source.unsplash.com/600x400/?house", timestamp: "5h ago", type: "blog" },
    { id: 3, user: "EstateHub Admin", avatar: "https://randomuser.me/api/portraits/men/3.jpg", content: "We updated our website!", image: "https://source.unsplash.com/600x400/?real-estate", timestamp: "1d ago", type: "event" },
    { id: 4, user: "Sarah Brown", avatar: "https://randomuser.me/api/portraits/women/5.jpg", content: "Open house this weekend!", image: "https://source.unsplash.com/600x400/?open-house", timestamp: "6h ago", type: "event" }
];

const BlogAndEventsPage = () => {
    const [posts, setPosts] = useState(initialPosts);
    const loadMore = () => {
        setTimeout(() => {
            setPosts((prev) => [...prev, ...initialPosts]);
        }, 1000);
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadMore();
            }
        });
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex gap-6">
            {/* Posts Section */}
            <div className="w-1/3 space-y-6">
                <h2 className="text-2xl font-bold text-gray-700">Social Posts</h2>
                {posts.filter(p => p.type === "post").map(post => (
                    <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card className="p-4 rounded-lg shadow-lg border bg-white">
                            <div className="flex items-center gap-4">
                                <Avatar src={post.avatar} alt={post.user} />
                                <div>
                                    <p className="font-semibold text-gray-900">{post.user}</p>
                                    <p className="text-gray-500 text-sm">{post.timestamp}</p>
                                </div>
                            </div>
                            <CardContent>
                                <p className="text-gray-700">{post.content}</p>
                                {post.image && <CardMedia component="img" image={post.image} className="rounded-lg mt-4" />}
                                <div className="flex justify-between mt-4">
                                    <IconButton><Favorite /></IconButton>
                                    <IconButton><Repeat /></IconButton>
                                    <IconButton><ChatBubbleOutline /></IconButton>
                                    <IconButton><Share /></IconButton>
                                </div>
                            </CardContent>
                        </Card>
                        <Divider className="my-4" />
                    </motion.div>
                ))}
            </div>

            {/* Blog Section */}
            <div className="w-1/3 space-y-6">
                <h2 className="text-2xl font-bold text-blue-600">Latest Blogs</h2>
                {posts.filter(p => p.type === "blog").map(post => (
                    <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card className="p-4 rounded-lg shadow-lg border bg-white">
                            <CardContent>
                                <h3 className="font-semibold text-gray-900">{post.user}</h3>
                                <p className="text-gray-500 text-sm">{post.timestamp}</p>
                                <p className="text-gray-700 mt-2">{post.content}</p>
                                {post.image && <CardMedia component="img" image={post.image} className="rounded-lg mt-4" />}
                                <Button variant="contained" color="primary" className="mt-4">Read More</Button>
                            </CardContent>
                        </Card>
                        <Divider className="my-4" />
                    </motion.div>
                ))}
            </div>

            {/* Events Section */}
            <div className="w-1/3 space-y-6">
                <h2 className="text-2xl font-bold text-green-600">Upcoming Events</h2>
                {posts.filter(p => p.type === "event").map(post => (
                    <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card className="p-4 rounded-lg shadow-lg border bg-white">
                            <CardContent>
                                <h3 className="font-semibold text-gray-900">{post.user}</h3>
                                <p className="text-gray-500 text-sm">{post.timestamp}</p>
                                <p className="text-gray-700 mt-2">{post.content}</p>
                                {post.image && <CardMedia component="img" image={post.image} className="rounded-lg mt-4" />}
                                <Button variant="contained" color="success" className="mt-4">Join Event</Button>
                            </CardContent>
                        </Card>
                        <Divider className="my-4" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogAndEventsPage;
