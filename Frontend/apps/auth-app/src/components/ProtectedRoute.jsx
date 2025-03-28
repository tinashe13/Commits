import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifySession } from '../api/auth';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authMsg, setAuthMsg] = useState('');

  useEffect(() => {
    verifySession()
      .then((data) => {
        setAuthMsg(data.message); // show API message if needed
        setLoading(false);
      })
      .catch((err) => {
        console.log('Auth Error:', err.message);
        navigate('/');
      });
  }, []);

  if (loading) return <p>{authMsg || 'Checking authentication...'}</p>;

  return children;
}
