import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://cat-gallery-1-gmob.onrender.com/';

const App = () => {
    const [cats, setCats] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBreeds();
        fetchCats();
    }, []);

    const fetchBreeds = async () => {
        try {
            const response = await axios.get(`${API_URL}/breeds`);
            setBreeds(response.data);
        } catch (error) {
            console.error('Error fetching breeds:', error);
        }
    };

    const fetchCats = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/cats`, {
                params: { breed_id: selectedBreed || undefined, limit: 6 }
            });
            setCats(response.data);
        } catch (error) {
            console.error('Error fetching cats:', error);
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">🐱 Cat Image Gallery</h1>

            <div className="flex justify-center items-center mb-6">
                <select
                    className="border p-2 rounded-md text-gray-700"
                    value={selectedBreed}
                    onChange={(e) => setSelectedBreed(e.target.value)}
                >
                    <option value="">All Breeds</option>
                    {breeds.map((breed) => (
                        <option key={breed.id} value={breed.id}>
                            {breed.name}
                        </option>
                    ))}
                </select>
                <button
                    className="ml-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    onClick={fetchCats}
                >
                    Filter
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {loading ? (
                    <p className="col-span-3 text-center">Loading...</p>
                ) : (
                    cats.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex justify-center items-center bg-gray-100 rounded-lg shadow-md p-3"
                        >
                            <img
                                src={cat.url}
                                alt="Cat"
                                className="w-64 h-64 object-cover rounded-md"
                            />
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    className="p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    onClick={fetchCats}
                >
                    Load More
                </button>
            </div>
        </div>
    );
};

export default App;
