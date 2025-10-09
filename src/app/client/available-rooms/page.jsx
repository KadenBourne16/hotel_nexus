"use client";
import { useEffect, useState } from "react";

export default function AvailableRooms() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const fetch_rooms = async() => {
            try{
                const response = await fetch("/api/client/rooms");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();

                // Extract the rooms array from the API response
                const rooms = responseData.data || [];
                setRooms(rooms);
                console.log("Rooms fetched:", rooms);
            }catch(err){
                console.error("Error fetching rooms:", err);
                setRooms([]); // Set empty array on error
            }
        }
        fetch_rooms();
    }, []);
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Available Rooms</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {rooms.map((room) => (
                    <div key={room._id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        padding: '20px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    }}
                    >
                        <div style={{ marginBottom: '15px' }}>
                            <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontSize: '1.4em' }}>
                                Room {room.room_number} - {room.type}
                            </h2>
                            <div style={{
                                display: 'inline-block',
                                padding: '4px 8px',
                                backgroundColor: room.status === 'available' ? '#27ae60' : '#e74c3c',
                                color: 'white',
                                borderRadius: '4px',
                                fontSize: '0.8em',
                                fontWeight: 'bold'
                            }}>
                                {room.status.toUpperCase()}
                            </div>
                        </div>

                        <p style={{ color: '#666', margin: '10px 0', lineHeight: '1.5' }}>
                            {room.description}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                            <div>
                                <strong>Price per night:</strong>
                                <span style={{ color: '#e74c3c', fontSize: '1.2em', marginLeft: '5px' }}>
                                    ${room.price}
                                </span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <strong>Capacity:</strong>
                                <span style={{ marginLeft: '5px' }}>{room.capacity} guests</span>
                            </div>
                        </div>

                        {room.rating && (
                            <div style={{ margin: '10px 0' }}>
                                <strong>Rating:</strong>
                                <span style={{ marginLeft: '5px', color: '#f39c12' }}>
                                    {'★'.repeat(Math.floor(room.rating))}{'☆'.repeat(5 - Math.floor(room.rating))} ({room.rating})
                                </span>
                            </div>
                        )}

                        {room.amenities && room.amenities.length > 0 && (
                            <div style={{ margin: '15px 0' }}>
                                <strong>Amenities:</strong>
                                <div style={{ marginTop: '5px' }}>
                                    {room.amenities.map((amenity, index) => (
                                        <span key={index} style={{
                                            display: 'inline-block',
                                            backgroundColor: '#ecf0f1',
                                            padding: '3px 8px',
                                            margin: '2px',
                                            borderRadius: '3px',
                                            fontSize: '0.8em',
                                            color: '#2c3e50'
                                        }}>
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}