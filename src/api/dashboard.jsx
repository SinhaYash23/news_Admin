const BASE_URL = 'http://localhost:5000/api'; // or your actual URL

const fetchWithAuth = async (endpoint) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found');

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error(`Error ${res.status}`);

    return res.json();
};

export const getUsersCount = () => fetchWithAuth('/users/count');
export const getNewsCount = () => fetchWithAuth('/news/count');
export const getArticlesCount = () => fetchWithAuth('/articles/count');
export const getBlogsCount = () => fetchWithAuth('/blogs/count');
