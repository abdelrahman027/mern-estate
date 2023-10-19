import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleAuth = async () => {
        try
        {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error)
        {
            console.log('couldnot sign in with google', error)
        }
    }
    return (
        <button
            onClick={handleGoogleAuth}
            type='button'
            className="bg-red-700 flex items-center justify-center gap-2 text-white p-3 rounded lg hover:bg-red-800 uppercase ">Google <FcGoogle className='h-6 w-6 bg-white rounded-full' /></button>
    )
}

export default OAuth